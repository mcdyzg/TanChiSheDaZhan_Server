$(function() {
    // 如果系统支持锁屏API那么就进行锁屏
    // portrait-primary -- 竖屏锁定
    // landscape-landscape -- 横屏锁定
    // window.screen.unlockOrientation(); -- 解除锁屏
    if (window.screen && window.screen.lockOrientation) {
        win.screen.lockOrientation([
            "portrait-primary",
            "portrait-secondary"
        ]);
    }
    // Initialize varibles
    var win = window;
    var $win = $(window);

    // Prompt for setting a username
    var connected = false;
    win.socket = io();
    win.__GameInfo__ = {
        userKey: '',
        roomKey: '',
        camp: ''
    };

    $('#start_game').on('click', function() {
        var d = new Date();
        if(__GameInfo__.userKey && __GameInfo__.roomKey && __GameInfo__.camp) return;
        socket.emit('join room', {
            game: 'doushouqi',
            nicheng: $('#nicheng').val() || '游客' + d.getTime(),
            phone: $('#phone').val() || ''
        });
    });
    // Socket events
    // socket.emit('join room', 'doushouqi');
    // socket.on('user connected', function(data) {
    //     console.log(data);
    // });
    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('joined room', function(data) {
        __GameInfo__.userKey = data.userKey;
        __GameInfo__.roomKey = data.roomKey;
        __GameInfo__.camp = data.camp;
        __GameInfo__.info = data.gameInfo;
        console.log(__GameInfo__);
        socket.on('synced info ' + __GameInfo__.roomKey, function(data) {
            console.log(data);
        });
    });
});
