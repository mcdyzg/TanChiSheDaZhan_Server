module.exports = function(app) {

    // usernames which are currently connected to the chat
    var users = {};
    var rooms = [];
    var numUsers = 0;

    // middleware for connect and disconnect
    app.io.use(function* userLeft(next) {
        console.log('somebody connected');
        console.log(this.headers);
        yield * next;
        // on disconnect
        if (this.addedUser) {
            delete users[this.userKey];
            --numUsers;
            // echo globally that this client has left
            this.broadcast.emit('user left', {
                userKey: this.userKey,
                numUsers: numUsers
            });
        }
    });
    // 每个房间进来就已经对房间的游戏种类，以及房间的类型进行了规范。
    app.io.route('join room', function*(next, info) {
        var userKey = F.util.getUuid();
        users[userKey] = {
            nicheng: info.nicheng,
            phone: info.phone,
            isValidated: false
        };
        ++numUsers;
        var gameName = info.game;
        var roomUuid;

        // 判断最后一个房间还有没有位置
        if (!(rooms[rooms.length - 1] && rooms[rooms.length - 1].leftUsers > 0)) {
            roomUuid = F.util.getUuid();
            createRoom(roomUuid, userKey, gameName);
        }

        // 加入到这个房间，同步信息
        var lastRoom = rooms[rooms.length - 1];
        --lastRoom.leftUsers;
        lastRoom.members.push(userKey);
        roomUuid = lastRoom.roomUuid;
        var camp = lastRoom.camps.shift();
        lastRoom.gameInfo[camp].name = info.nicheng;
        this.emit('joined room', {
            userKey: userKey,
            roomKey: roomUuid,
            gameInfo: lastRoom.gameInfo,
            camp: camp,
            ready: lastRoom.leftUsers <= 0 ? true : false
        });
        
        // 如果加入后此房间满员，同步其它玩家开始游戏
        if (lastRoom.leftUsers <= 0) {
            this.broadcast.emit('synced info ' + roomUuid, { ready: true });
        }
    });

    function createRoom(roomUuid, userKey, gameName) {
        console.log('create room -- %s', roomUuid);
        var gameInfo = require(C.game + gameName)();
        rooms.push({
            roomUuid: roomUuid,
            leftUsers: gameInfo.roomLimit,
            members: [],
            gameInfo: gameInfo,
            camps: gameInfo.camps,
            gameName: gameName
        });

        // when the client emits 'new message', this listens and executes
        app.io.route('sync info ' + roomUuid, function*(next, info) {
            
            this.broadcast.emit('synced info ' + roomUuid, info);
        });
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
