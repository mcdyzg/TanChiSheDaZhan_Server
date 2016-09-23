module.exports = function(app) {

    // usernames which are currently connected to the chat
    var users = {};
    var rooms = {};

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
            // for(var i in rooms) {
            //     if(this.roomUuid === i) {
            //         if(rooms[i].leftUsers === 0 && rooms[i].isPlaying === true) {
            //             delete rooms[this.roomUuid]
            //         }else {
            //             console.log(rooms[this.roomUuid])
            //             rooms[this.roomUuid].leftUsers++;
            //         }
            //         break;
            //     }
            // }

            if(rooms[this.roomUuid].isPlaying === true) {
                delete rooms[this.roomUuid]
            }

        }
    });
    // 每个房间进来就已经对房间的游戏种类，以及房间的类型进行了规范。
    app.io.route('join room', function*(next, info) {
        var t = this;

        // 创建房间号
        this.roomUuid;

        // 加入房间后设置flag，标识此用户已加入房间。
        this.addedUser = true;

        // 生成user id
        this.userKey = F.util.getUuid();
        users[this.userKey] = {
            nicheng: info.nicheng,
            // phone: info.phone,
            isValidated: false
        };

        // 要玩的游戏名称
        this.gameName = info.game;

        // 判断房间还有没有位置,没有位置的话创建一个房间。有的话给用户赋予房间号，并且广播出去
        if(isEmptyObject(rooms)) {

            console.log('第一个房间')

            this.roomUuid = F.util.getUuid();

            // 创建房间
            createRoom(this.roomUuid, this.userKey, this.gameName);

            //加入房间
            joinRoom.call(this, this.roomUuid, this.userKey, info.nicheng);

        } else {

            // 是否已加入房间
            var hasAddRoom;

            for(var r in rooms) {
                var temRoom = rooms[r];

                if(temRoom && temRoom.isPlaying === false && temRoom.leftUsers > 0 ) {

                    console.log('加入已有房间')

                    hasAddRoom = true;

                    // 加入房间 
                    joinRoom.call(this, r, this.userKey, info.nicheng)

                    break;
                }
            }

            // 如果没有加入到合适的房间，新建房间
            if(hasAddRoom !== true) {

                console.log('新建房间')

                // 创建房间号
                this.roomUuid = F.util.getUuid();

                // 创建房间
                createRoom(this.roomUuid, this.userKey, this.gameName);

                //加入房间
                joinRoom.call(this, this.roomUuid, this.userKey, info.nicheng);

            }

        }

        console.log('------------')

    });

    function createRoom(roomUuid, userKey, gameName) {
        console.log('create room -- %s', roomUuid);

        // 加载想玩的游戏
        var wantedGame = require(C.game + gameName);

        // 复制
        var gameInfo = _.cloneDeep(wantedGame);

        rooms[roomUuid] = gameInfo;
        console.log(roomUuid)
        // when the client emits 'new message', this listens and executes；当房间创建好时，创建传输游戏信息的信道，这个信道将一直存在，供玩家使用，信道加入房间号，因此只有本房间玩家才会使用到此信道
        app.io.route('sync info ' + roomUuid, function*(next, info) {

            // console.log(info)
            this.broadcast.emit('synced info ' + roomUuid, info);
        });
    }

    function joinRoom(roomUuid, userKey, nc){
        // console.log(userKey)
        var nowRoom = rooms[roomUuid];

        // 房间可加入空位减一
        --nowRoom.leftUsers;

        // 更新游戏包信息
        nowRoom.gameInfo[userKey] = nowRoom.gameInfo[nowRoom.totalUsers - nowRoom.leftUsers];
        nowRoom.gameInfo[userKey]['userKey'] = userKey;
        nowRoom.gameInfo[userKey]['nicheng'] = nc.toString();

        // 删除游戏包的预制信息
        delete nowRoom.gameInfo[nowRoom.totalUsers - nowRoom.leftUsers];

        //告诉客户端房间号
        this.emit('joined room', {
            roomUuid: roomUuid,
            userKey: userKey
        });

        // 给自己发有几个玩家加入
        this.emit('start game ' + roomUuid, {
            // userKey: userKey,
            roomKey: roomUuid,
            gameInfo: nowRoom.gameInfo,
            // 游戏配置项
            config: nowRoom.config,
            leftUsers: nowRoom.leftUsers,
            ready: nowRoom.leftUsers <= 0 ? true : false
        })

        // 给别的玩家发有几个玩家加入了
        this.broadcast.emit('start game ' + roomUuid, {
            // userKey: userKey,
            roomKey: roomUuid,
            gameInfo: nowRoom.gameInfo,
            // 游戏配置项
            config: nowRoom.config,
            leftUsers: nowRoom.leftUsers,
            ready: nowRoom.leftUsers <= 0 ? true : false
        });

        if(nowRoom.leftUsers === 0) {
            nowRoom.isPlaying = true;
        }
    }

    function isEmptyObject(o){
        for(var i in o) {
            return false;
        }
        return true;
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
