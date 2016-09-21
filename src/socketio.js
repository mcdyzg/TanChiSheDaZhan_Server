module.exports = function(app) {

    // usernames which are currently connected to the chat
    var users = {};
    var rooms = [];

    // middleware for connect and disconnect
    app.io.use(function* userLeft(next) {
        console.log('somebody connected');
        // console.log(this.headers);
        yield * next;
        // on disconnect
        
        // 这些代码连接中断时才会执行
        if (this.addedUser) {
            // delete users[this.userKey];
            // echo globally that this client has left
            // this.broadcast.emit('user left', {
            //     userKey: this.userKey,
            //     numUsers: numUsers
            // });

            // 玩家退出时所在房间空位加 1
            for(var i in rooms) {
                if(this.roomUuid === rooms[i].roomUuid) {
                    if(rooms[i].leftUsers === rooms[i].totalUsers) {
                        rooms.splice(i,1);
                    }else {
                        rooms[i].leftUsers++;
                    }
                    break;
                }
                
            }
        }
    });
    // 每个房间进来就已经对房间的游戏种类，以及房间的类型进行了规范。
    app.io.route('join room', function*(next, info) {
        var t = this;

        // 房间号
        this.roomUuid;

        // 加入房间后设置flag，标识此用户已加入房间。
        this.addedUser = true;

        // 生成user (暂不使用)
        var userKey = F.util.getUuid();
        users[userKey] = {
            nicheng: info.nicheng,
            // phone: info.phone,
            isValidated: false
        };

        // 游戏名称
        var gameName = info.game;

        // 判断房间还有没有位置,没有位置的话创建一个房间。有的话给用户赋予房间号，并且广播出去
        if(rooms.length === 0) {

            // 创建房间号
            this.roomUuid = F.util.getUuid();
            // 创建房间
            createRoom(this.roomUuid, userKey, gameName);
            --rooms[0].leftUsers;
            // 将用户昵称写到游戏包中
            rooms[0].gameInfo[0].name = 'player' + info.nicheng + '0';
            // 广播给自己
            this.emit('start game', {
                // userKey: userKey,
                roomKey: this.roomUuid,
                gameInfo: rooms[0].gameInfo,
                // camp: camp,
                leftUsers: rooms[0].leftUsers,
                ready: rooms[0].leftUsers <= 0 ? true : false
            });
            // 广播给其他人
            this.broadcast.emit('start game', {
                // userKey: userKey,
                roomKey: this.roomUuid,
                gameInfo: rooms[0].gameInfo,
                // camp: camp,
                leftUsers: rooms[0].leftUsers,
                ready: rooms[0].leftUsers <= 0 ? true : false
            });

        } else {

            // 是否已加入房间
            var hasAddRoom;

            for(var r in rooms) {
                var temRoom = rooms[r];

                if(temRoom && temRoom.isPlaying === false && temRoom.leftUsers > 0 ) {

                    hasAddRoom = true;
                    // 设置用户房间号
                    this.roomUuid = temRoom.roomUuid;
                    // 将用户昵称写到游戏包中
                    temRoom.gameInfo[temRoom.totalUsers-temRoom.leftUsers].name = 'player' + info.nicheng + (temRoom.totalUsers-temRoom.leftUsers);
                    --temRoom.leftUsers;
                    // 广播给自己
                    this.emit('start game', {
                        // userKey: userKey,
                        roomKey: this.roomUuid,
                        gameInfo: temRoom.gameInfo,
                        // camp: camp,
                        leftUsers: temRoom.leftUsers,
                        ready: temRoom.leftUsers <= 0 ? true : false
                    });
                    // 广播给其他人
                    this.broadcast.emit('start game', {
                        // userKey: userKey,
                        roomKey: this.roomUuid,
                        gameInfo: temRoom.gameInfo,
                        // camp: camp,
                        leftUsers: temRoom.leftUsers,
                        ready: temRoom.leftUsers <= 0 ? true : false
                    });

                    break;
                }
            }

            // 如果没有加入到合适的房间，新建房间
            if(hasAddRoom !== true) {

                // 创建房间号
                this.roomUuid = F.util.getUuid();
                // 创建房间
                var addRoom = createRoom(this.roomUuid, userKey, gameName);
                --addRoom.leftUsers;
                addRoom.gameInfo[0].name = 'player' + info.nicheng + '0';
                // 广播给自己
                this.emit('start game', {
                    // userKey: userKey,
                    roomKey: this.roomUuid,
                    gameInfo: addRoom.gameInfo,
                    // camp: camp,
                    leftUsers: addRoom.leftUsers,
                    ready: addRoom.leftUsers <= 0 ? true : false
                });
                // 广播给其他人
                this.broadcast.emit('start game', {
                    // userKey: userKey,
                    roomKey: this.roomUuid,
                    gameInfo: addRoom.gameInfo,
                    // camp: camp,
                    leftUsers: addRoom.leftUsers,
                    ready: addRoom.leftUsers <= 0 ? true : false
                });
            }

        }

        // // 如果房间还有空位，添加玩家
        // if(rooms[rooms.length - 1].leftUsers > 0 ){
        //     // 加入到这个房间，同步信息
        //     var lastRoom = rooms[rooms.length - 1];
        //     --lastRoom.leftUsers;
        //     // lastRoom.members.push(userKey);
        //     // roomUuid = lastRoom.roomUuid;
        //     // var camp = lastRoom.camps.shift();
        //     lastRoom.gameInfo[numUsers-1].name = 'player' + info.nicheng + (numUsers-1);

        //     this.emit('start game', {
        //         // userKey: userKey,
        //         roomKey: roomUuid,
        //         gameInfo: lastRoom.gameInfo,
        //         // camp: camp,
        //         ready: lastRoom.leftUsers <= 0 ? true : false
        //     });
        //     this.broadcast.emit('start game', {
        //         // userKey: userKey,
        //         roomKey: roomUuid,
        //         gameInfo: lastRoom.gameInfo,
        //         // camp: camp,
        //         ready: lastRoom.leftUsers <= 0 ? true : false
        //     });

        //     // 如果加入后此房间满员，同步其它玩家开始游戏
        //     // if (lastRoom.leftUsers <= 0) {
        //         // this.broadcast.emit('synced info ' + roomUuid, { ready: true });
        //     // }
        // }

        console.log('------------')

    });

    function createRoom(roomUuid, userKey, gameName) {
        console.log('create room -- %s', roomUuid);

        // 加载游戏初始包
        var gameInfo = require(C.game + gameName);
        // console.log(gameInfo)
        rooms.push({
            // 游戏是否已开始
            isPlaying:false,
            // 房间号
            roomUuid: roomUuid,
            // 总玩家数
            totalUsers:2,
            // 剩余可加入的玩家个数
            leftUsers: 2,
            // members: [],
            // 游戏信息
            gameInfo: gameInfo,
            // camps: gameInfo.camps,
            // 游戏名称
            gameName: gameName
        });
        // when the client emits 'new message', this listens and executes；当房间创建好时，创建传输游戏信息的信道，这个信道将一直存在，供玩家使用，信道加入房间号，因此只有本房间玩家才会使用到此信道
        app.io.route('sync info ' + roomUuid, function*(next, info) {
            // console.log(info)
            this.broadcast.emit('synced info ' + roomUuid, info);
        });

        // 返回新创建的房间
        return rooms[rooms.length-1];
    }

    function loadScript(url, callback) {
        var script = document.createElement_x("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE 
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera 
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.body.appendChild(script);
    }

}
