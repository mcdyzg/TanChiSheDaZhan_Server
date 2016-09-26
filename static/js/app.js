/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(win, $) {
	    function log(content){
	        console.log(content)
	    }
	    window.socket = io();
	    window.__event__ = {};
	    //获取游戏信息
	    // window.playerdata = require('./playerdata');
	    window._GameInfo = {};
	    // 房间号
	    window.roomUuid;
	    // 玩家id
	    window.userKey;
	    // 安放炸弹事件集合
	    window.putBoomEvent = {};
	    //炸弹组
	    window.zhadanLayer;
	    // 屏幕尺寸
	    window.winW = $(window).width();
	    window.winH = $(window).height();
	    window.halfW = winW / 2;
	    window.halfH = winH / 2;
	    // 蛇的颜色
	    var COLORS = ['anhuang', 'cheng', 'hei', 'hong', 'huang', 'hui', 'kafei', 'lan', 'qing', 'zi'];
	    // 糖豆的颜色
	    var douColor = ['anhuang','danlu','fen','huang','lan','lu','zaohong','zi'];
	    // 游戏边界
	    var bounds;
	    // 系统按钮监听pad
	    var pad, stick;
	    //加速按钮
	    var buttonJiaSu;
	    //游戏设置
	    var config;
	    // 初始化蛇对象
	    var Snake = __webpack_require__(1);
	    //糖豆组
	    var tangdouLayer;
	    // 小蛇头部的组
	    var snakeLayer;
	    // 小蛇身体的组
	    window.snakeBodyLayer ;
	    // 小蛇头部的组
	    window.snakeHeadLayer;
	    // 小蛇实例
	    var snake;
	    // 玩家数据信息
	    var player;
	    // 敌人数组
	    window.enemy = {};
	    // 显示分数
	    var scoreBoard;
	    // 墙的组
	    var wallGroup;
	    var leftWall;
	    var rightWall;
	    var topWall;
	    var bottomWall;
	    // 玩家昵称
	    var nicheng;
	    // 昵称输入框
	    var nichengInput;
	    

	    // 游戏初始化
	    // 全屏创建
	    // var game = new Phaser.Game(winW, winH, Phaser.WEBGL, '', {
	    //     preload: preload,
	    //     create: create,
	    //     update: update,
	    //     render: render
	    // }); 
	    var game = new Phaser.Game(winW, winH, Phaser.WEBGL,'game'); 

	    game.States = {};

	    game.States.prepare = function(){
	        this.preload = function(){
	            
	        };
	        this.create = function(){
	            game.state.start('preload');
	        };
	    }

	    game.States.preload = function(){
	        this.preload = function(){
	            game.load.image('logo', 'assets/logo.png');
	            game.load.image('connectBg', 'assets/bg2.png');
	            game.load.image('grid', 'assets/bg.png');
	            game.load.atlas('atlas', 'assets/sucai.png', 'assets/sucai.json');
	            game.load.atlas('dou', 'assets/dou.png', 'assets/dou.json');
	            game.load.atlas('boom', 'assets/boom.png', 'assets/boom.json');
	            game.load.image('wall', 'assets/wall.png');
	            // game.load.image('resultBg', 'assets/resultBg.png');
	            game.load.image('ready', 'assets/ready.png');
	        };

	        this.create = function(){
	            game.state.start('connect');
	        }
	        
	    }

	    game.States.connect = function(){

	        this.create = function(){

	            var t = this;

	            // game.onPause.add(function(){
	            //     game.paused = false;
	            //     console.log(game.paused)
	            // })

	            this.stage.backgroundColor = '#EEE';

	            // 首页背景图
	            this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'connectBg');

	            // logo
	            this.logo = game.add.sprite(game.world.centerX, game.world.centerY-70, 'logo');
	            this.logo.anchor.setTo(0.5);

	            // 输入昵称的框
	            nichengInput = $('<input type="" />').css({
	                'position':'fixed',
	                'width':'172px',
	                'left': game.world.centerX - 86,
	                'top':game.world.centerY - 10
	            })
	            $('body').prepend(nichengInput)

	            // 点击开始游戏
	            this.ready = game.add.button(game.world.centerX , game.world.centerY + 60, 'ready', this.zhunbei, this);
	            this.ready.anchor.set(0.5);

	        };

	        this.zhunbei = function(){
	            var t = this;

	            if(nichengInput.val() === '') {
	                return;
	            }

	            // 隐藏背景
	            this.ready.visible = false;
	            this.bg.visible = false;
	            this.logo.visible = false;
	            nichengInput.hide();

	            var ready = game.add.text(game.world.centerX , game.world.centerY, '正在匹配玩家，请稍等', this);
	            ready.anchor.set(0.5);


	            // 加入房间
	            var d = new Date();
	            // nicheng = nichengInput.val().toString() + d.getTime();
	            nicheng = nichengInput.val().toString();
	            socket.emit('join room', {
	                game: 'TanChiSheDaZhan',
	                nicheng: nicheng
	            });

	            // 接收服务器返回的房间号
	            socket.on('joined room',function(data){

	                // 玩家id
	                userKey = data.userKey;
	                roomUuid = data.roomUuid;

	                socket.on('start game ' + data.roomUuid, function(data){

	                    // 如果ready为true那么开始游戏，为false显示房间还有几个空位
	                    if(data.ready) {
	                        
	                        // 同步数据信息到本地
	                        _GameInfo = data.gameInfo;
	                        player = _GameInfo[userKey];
	                        config = data.config;

	                        // 监听远程数据
	                        socket.on('synced info ' + roomUuid, function(dt){

	                            if(_GameInfo[userKey].isDead === true) {
	                                return;
	                            }else {
	                                if(dt.action !== 'position') {
	                                    _GameInfo[dt.user][dt.action] = dt.data;
	                                }else {
	                                    _GameInfo[dt.user]['ix'] = dt.data.ix;
	                                    _GameInfo[dt.user]['iy'] = dt.data.iy;
	                                }
	                                
	                                // var temDt = dt.data.split('/');
	                                // // console.log(temDt)
	                                // if(temDt[1] !== 'position') {
	                                //     _GameInfo[temDt[0]][temDt[1]] = temDt[2];
	                                // }else {
	                                //     _GameInfo[temDt[0]]['ix'] = temDt[2];
	                                //     _GameInfo[temDt[0]]['iy'] = temDt[3];
	                                // }

	                                // if(dt.action === 'rota' && _GameInfo[userKey].isDead === false) {
	                                //     enemy[dt.user].move();
	                                // }
	                            }
	                        })

	                        t.start()
	                    }else {
	                        // ready.setText("再等待" + data.leftUsers + "位玩家，请稍候");
	                    }
	                });
	            });

	            
	        };

	        this.start = function(){
	            game.state.start('main');
	        };
	    }

	    game.States.main = function(){
	        this.create = create;
	        this.update = update;
	        this.render = render;
	    }

	    function preload() {   

	    }

	    function update() {
	        // 注册碰撞事件
	        // game.physics.arcade.collide(snake, tangdouLayer, _chiTangDou, null, this);
	        // 头和糖豆碰撞
	        game.physics.arcade.overlap(snakeHeadLayer, tangdouLayer, _chiTangDou, null, this);
	        // 头和炸弹碰撞
	        game.physics.arcade.overlap(snakeHeadLayer, zhadanLayer, _over, null, this);
	        // 头和身子碰撞
	        game.physics.arcade.overlap(snakeHeadLayer, snakeBodyLayer, _over2, null, this);
	        // 头和墙碰撞
	        game.physics.arcade.overlap(snakeHeadLayer, wallGroup, _over2, null, this);

	        // 蛇头探路者和墙碰撞，实现自动转向
	        // game.physics.arcade.overlap(snakeLayer, wallGroup, _over3, null, this);
	        // 蛇头探路者和蛇碰撞，实现自动转向
	        // game.physics.arcade.overlap(snakeLayer, snakeBodyLayer, _over3, null, this);
	        // 蛇头探路者和炸弹碰撞，实现自动转向
	        // game.physics.arcade.overlap(snakeLayer, zhadanLayer, _over3, null, this);

	        // 实时的显示炸弹数
	        scoreBoard.text = Math.floor(player.score/4);
	        // player.body.setZeroVelocity();
	        // player.body.velocity.x = 90;
	        // player.body.velocity.y = 90;
	        

	        // 糖豆少时添加糖豆
	        if(tangdouLayer.children.length < config.dou-20) {
	            _jiaDouDou();
	        }    

	    }

	    function create() {
	        game.renderer.renderSession.roundPixels = true;
	        game.physics.startSystem(Phaser.Physics.ARCADE);

	        // 添加背景
	        bg = game.add.tileSprite(halfW, halfH, 1000, 1000, 'grid');

	        // 改变背景颜色
	        game.stage.backgroundColor = '#761C1B';

	        // 设定背景范围
	        game.world.setBounds(0, 0, 1000 + winW, 1000 + winH);
	        // game.world.setBounds(halfW, halfH, 1000, 1000);

	        // 添加小蛇身体的组
	        snakeBodyLayer = game.add.group();
	        snakeBodyLayer.enableBody = true;
	        snakeBodyLayer.physicsBodyType = Phaser.Physics.ARCADE;

	        // 添加小蛇头部的组
	        snakeHeadLayer = game.add.group();
	        snakeHeadLayer.enableBody = true;
	        snakeHeadLayer.physicsBodyType = Phaser.Physics.ARCADE;

	        // 添加小蛇头部的组
	        snakeLayer = game.add.group();
	        snakeLayer.enableBody = true;
	        snakeLayer.physicsBodyType = Phaser.Physics.ARCADE;

	        // 添加糖豆组
	        tangdouLayer = game.add.group();
	        tangdouLayer.enableBody = true;
	        tangdouLayer.physicsBodyType = Phaser.Physics.ARCADE;

	        // 添加炸弹组
	        zhadanLayer = game.add.group();
	        zhadanLayer.enableBody = true;
	        zhadanLayer.physicsBodyType = Phaser.Physics.ARCADE;

	        // 生成糖豆的边界
	        bounds = new Phaser.Rectangle(halfW+50, halfH+50, 900, 900);

	        //生成玩家，此处的snake包含头部，section数组，childPath数组,snake是玩家的小蛇实体
	        snake = new Snake(game, userKey);
	        // snake.body.setCircle(30);
	        // snake.body.offset = {x:-15,y:-15}
	        snakeLayer.add(snake);

	        // 允许碰撞到边界
	        // snake.body.collideWorldBounds = true;

	        // 碰撞到边界反弹
	        // snake.body.bounce.set(1);

	        // 生成随机小蛇
	        for (var i in _GameInfo) {
	            // 生成其他玩家的蛇，不包括自己
	            if(_GameInfo[i].userKey !== userKey) {
	                // playerdata[i].rotation = i;
	                // playerdata[i].ix = bounds.randomX;
	                // playerdata[i].iy = bounds.randomY;
	                // playerdata[i].color = COLORS[Math.floor(Math.random() * 10)];
	                
	                // enemy是其他玩家的小蛇实体集合
	                enemy[i] = new Snake(game, i);
	                snakeLayer.add(enemy[i]);

	            } else {
	                enemy[i] =snake;
	            }
	        }

	        // cursors = game.input.keyboard.createCursorKeys();

	        game.camera.follow(snake);

	        // 创建摇杆
	        _createStick();

	        // 撒豆
	        _saDouDou();

	        // 墙
	        wallGroup = game.add.group();
	        wallGroup.enableBody = true;
	        wallGroup.physicsBodyType = Phaser.Physics.ARCADE;

	        // 左边墙
	        // leftWall = game.add.tileSprite(0, 0, halfW, 1000 + winH, 'wall');
	        // wallGroup.add(leftWall);
	        leftWall = wallGroup.create(0,0,'wall',1);
	        leftWall.width =halfW;
	        leftWall.height =1000 + winH;
	        leftWall.name = 'wall';

	        // 右边墙
	        // rightWall = game.add.tileSprite(1000 + halfW, 0, halfW, 1000 + winH, 'wall');
	        // wallGroup.add(rightWall);
	        rightWall = wallGroup.create(1000 + halfW, 0,'wall',1);
	        rightWall.width =halfW;
	        rightWall.height =1000 + winH;
	        rightWall.name = 'wall';

	        // 上边墙
	        // topWall = game.add.tileSprite(halfW, 0, 1000, halfH, 'wall');
	        // wallGroup.add(topWall);
	        topWall = wallGroup.create(halfW, 0,'wall',1);
	        topWall.width =1000;
	        topWall.height =halfH;
	        topWall.name = 'wall';

	        // 下边墙
	        // bottomWall = game.add.tileSprite(halfW, 1000 + halfH, 1000, halfH, 'wall');
	        // wallGroup.add(bottomWall);
	        bottomWall = wallGroup.create(halfW, 1000 + halfH,'wall',1);
	        bottomWall.width =1000;
	        bottomWall.height =halfH;
	        bottomWall.name = 'wall';

	        // var aaa = game.add.sprite(game.world.centerX,game.world.centerY,'boom');
	        // game.physics.enable(aaa, Phaser.Physics.ARCADE);
	        // game.physics.arcade.velocityFromRotation(2, 140, aaa.body.velocity);
	        
	        // 显示剩余炸弹数
	        scoreBoard = game.add.text(0, 0, Math.floor(player.score/4), { font: "32px Arial", fill: "#333", align: "center" });
	        scoreBoard.fixedToCamera = true;
	        scoreBoard.cameraOffset.setTo(game.camera.width - 86, game.camera.height - 150);

	    }

	    function _createStick() {
	        // 虚拟的摇杆系统
	        pad = game.plugins.add(Phaser.VirtualJoystick);
	        // 初始化控制方向的摇杆
	        stick = pad.addStick(0, 0, 75, 'atlas');
	        stick.scale = 0.618;
	        stick.alignBottomLeft(30);
	        //  Only called when the stick MOVES
	        stick.onMove.add(_moveSnake);

	        // 初始化加速按钮
	        buttonJiaSu = pad.addButton(0, 0, 'atlas', 'jiasu', 'jiasu');
	        buttonJiaSu.scale = 0.618;
	        buttonJiaSu.alignBottomRight(30);
	        // 注册按钮点击事件
	        buttonJiaSu.onDown.add(_pressButtonJiaSu);
	        // 注册按钮松开事件
	        buttonJiaSu.onUp.add(_releaseButtonJiaSu);
	    }

	    function _moveSnake() {
	        if (stick.isDown) {

	            // 同步本地信息
	            _GameInfo[userKey].rota = stick.rotation;

	            // 向服务器同步信息
	            // socket.emit('sync info ' + roomUuid, JSON.stringify({
	            //     user:userKey,
	            //     action:'rota',
	            //     data:_GameInfo[userKey].rota
	            // }));

	            // 小蛇移动
	            // enemy[userKey].move();

	        }
	    }

	    function _pressButtonJiaSu() {
	        if(buttonJiaSu.isDown) {

	            // 向服务器同步信息
	            socket.emit('sync info ' + roomUuid, {
	                user:userKey,
	                action:'putboom',
	                data:true
	            });

	            // socket.emit('sync info ' + roomUuid, {
	            //     data: userKey + '/' + 'putboom' + '/' + 'true'
	            // });

	            // 本地同步信息
	            _GameInfo[userKey].putboom = 'true';
	        }
	    }

	    function _releaseButtonJiaSu() {
	        if(buttonJiaSu.isUp) {
	            
	            // 向服务器同步信息
	            socket.emit('sync info ' + roomUuid, {
	                user:userKey,
	                action:'putboom',
	                data:false
	            });
	            
	            // socket.emit('sync info ' + roomUuid, {
	            //     data:userKey + '/' + 'putboom' + '/' + 'false'
	            // });

	            // 同步本地信息
	            _GameInfo[userKey].putboom = 'false';
	        }
	    }

	    // 蛇碰到炸弹
	    function _over(a, b){
	        if(b.owner !== a.name) {

	            enemy[a.name].dead();
	            _GameInfo[b.owner].score += _GameInfo[a.name].score;

	            if(a.name === player.userKey){
	                gameOver();
	            }
	        }
	    }

	    // 蛇头碰到别人的身子或者碰到墙
	    function _over2(a, b){
	        if(a.name != b.name) {

	            // 蛇死亡
	            enemy[a.name].dead();
	            // 蛇头碰到蛇身子时，积分转移
	            if(b.name !== 'wall') {
	                _GameInfo[b.name].score += _GameInfo[a.name].score
	            }
	            if(a.name === player.userKey){
	                gameOver();
	            }
	        }
	    }

	    // 根据socket传回的数据，改变其他蛇的走向
	    function _moveOtherSnake(otherPlayer){
	        var n = otherPlayer.name.substring(otherPlayer.name.length -1 , otherPlayer.name.length);
	        enemy[n].setConfig(otherPlayer);
	        enemy[n].move();
	    }

	    // 蛇头探路者和其他精灵碰撞
	    function _over3(a, b){
	        if(a.name !== b.name) {
	            a.zhuanxiang();
	        }
	    }

	    function gameOver(){
	        _GameInfo[userKey].isDead = true;
	        // stick.visible = false;
	        // buttonJiaSu.visible = false;
	        // window.location.reload();
	        game.state.start('replay');
	    }

	    function _saDouDou() {
	        for (var i = config.dou; i > 0; i--) {
	            var color = _getRadomColor();
	            var _dou = tangdouLayer.create(bounds.randomX, bounds.randomY, 'dou', color);
	            _dou.color = color;
	            // _dou.anchor.setTo(0.5,0.5);
	            _dou.scale.setTo(0.65);
	            _dou.body.setCircle(5);
	        }
	    }

	    function _jiaDouDou() {
	        for (var i = 0; i < 20; i++) {
	            var color = _getRadomColor();
	            var _dou = tangdouLayer.create(bounds.randomX, bounds.randomY, 'dou', color);
	            _dou.color = color;
	            // _dou.anchor.setTo(0.5,0.5);
	            _dou.scale.setTo(0.65);
	            _dou.body.setCircle(5)
	        }
	    }

	    // 蛇头和糖豆碰撞
	    function _chiTangDou(a, b) {
	        // b.body.moveTo(a) = a.body.velocity;
	        // game.camera.follow();
	        // game.physics.arcade.moveToPointer(b, 400);
	        // b.kill();
	        var num = a.name.substring(a.name.length-1,a.name.length);
	        b.destroy();
	        playerdata[num].score++;
	    }

	    function _getRadomColor() {
	        return douColor[Math.floor(Math.random() * 10)];
	    }

	    function render(){
	        // game.debug.body(snake);
	        // console.log(snake)
	        // game.debug.spriteInfo(_dou, 32, 32);
	    }

	    game.States.replay = function(){
	        this.create = function(){

	            game.stage.backgroundColor = '#EEE';

	            // 重新来
	            var chonglai = game.add.sprite(0, 0, 'atlas', 'chonglai');
	            chonglai.fixedToCamera = true;
	            chonglai.cameraOffset.setTo(game.camera.width/2, game.camera.height/2);
	            chonglai.scale.setTo(0.65);
	            chonglai.anchor.setTo(0.5);

	            game.input.onTap.addOnce(function(){
	                window.location.reload();
	            },this);
	        }
	    }

	    game.state.add('prepare', game.States.prepare);
	    game.state.add('preload', game.States.preload);
	    game.state.add('connect', game.States.connect);
	    game.state.add('main', game.States.main);
	    game.state.add('replay', game.States.replay);

	    game.state.start('prepare');

	})(window, jQuery);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// __event__.snake = new Phaser.Signal();

	function Snake(game, userKey) {
	    var t = this;

	    // 当前玩家数据
	    var player = _GameInfo[userKey];

	    // 初始化蛇信息
	    t.section = new Array();
	    t.childPath = [{
	        x: player.ix + halfW,
	        y: player.iy + halfH
	    }];
	    t.setConfig(player);

	    // 头部
	    // Phaser.Sprite.call(this, game, conf.ix, conf.iy, 'atlas', conf.color);
	    Phaser.Sprite.call(this, game, player.ix + halfW, player.iy +halfH);
	    t.anchor.setTo(0.5);
	    // t.scale.setTo(0.2);
	    game.physics.arcade.enable(t);
	    // 设置蛇头探路者的半径
	    t.body.setCircle(40);
	    t.body.offset = {x:-25,y:-25}

	    // game.physics.arcade.enable([t.head,t.eye]);
	    //  Init snakeSection array
	    for (var i = 1; i <= player.len; i++) {
	        t.section[i] = game.add.sprite(t.x, t.y, 'atlas', player.color);
	        if(i === 1) {
	            t.eye = t.section[i].addChild(game.make.sprite(0, 0, 'atlas', 'yanjing'));
	            t.eye.anchor.setTo(0.5);
	            snakeHeadLayer.add(t.section[i]);

	            // 玩家名字
	            var snakeNicheng = game.add.text(-5, -16, player.nicheng, { font: "12px Arial", fill: '#D62828' });
	            snakeNicheng.anchor.setTo(0.5);
	            t.section[i].addChild(snakeNicheng)

	        } else{
	            snakeBodyLayer.add(t.section[i]);
	        }
	        t.section[i].name = t.name;
	        t.section[i].anchor.setTo(0.5, 0.5);
	        t.section[i].body.setCircle(10);
	    }

	    // 生成小蛇路径
	    for (var i = 0; i <= player.len * t.space; i++) {
	        t.childPath[i] = new Phaser.Point(t.x, t.y);
	    }

	    game.add.existing(t);

	    t.move();

	    // 注册signal，用于在别的页面设置蛇的属性
	    // __event__.snake.add(t.ansy,t);
	}
	Snake.prototype = Object.create(Phaser.Sprite.prototype);
	Snake.prototype.constructor = Snake;

	Snake.prototype.dead = function() {
	    var t = this;
	    t.kill();
	    for(var i in t.section) {
	        if(t.section[i]) {
	            t.section[i].kill();
	        }
	    }
	}

	Snake.prototype.ansy = function(func, args) {
	    if(this[func]){
	        this[func](args);
	    }
	}

	Snake.prototype.setConfig = function(conf) {
	    var t = this;
	    // 把每个蛇独有的userKey赋给name属性
	    t.name = conf.userKey;
	    t.nicheng = conf.nicheng;
	    t.len = conf.len;
	    t.score = conf.score;
	    t.speed = conf.speed;
	    t.color = conf.color;
	    t.rota = conf.rota;
	    // 每个蛇身体间隔6个帧数的距离
	    t.space = conf.space;

	    // 是否正在安放炸弹中
	    t.isPuttingBoom = false;
	}

	Snake.prototype.getSectionPos = function(pos, i, rotation) {
	    var t = this;
	    var r = t.width * 2 / 4;
	    t.childPath[i] = {
	        x: pos.x - r * Math.cos(rotation),
	        y: pos.y - r * Math.sin(rotation)
	    };
	    // console.log(t.childPath[i])
	}

	Snake.prototype.move = function() {
	    var t = this;

	    var game = t.game;
	    // 玩家动
	    // if(t.name === playerdata[0].name) {
	        game.physics.arcade.velocityFromRotation(_GameInfo[t.name].rota, _GameInfo[t.name].speed, t.body.velocity);
	        // t.rotation = stick.rotation - Math.PI / 2;
	        // t.rotation = t.rota - Math.PI / 2;
	        t.eye.rotation = _GameInfo[t.name].rota - Math.PI / 2;
	    // } else {
	    //     // 其他玩家动
	    //     game.physics.arcade.velocityFromRotation(t.rota, t.speed, t.body.velocity);
	    //     t.eye.rotation = t.rota - Math.PI / 2;
	    //     // var t1 = game.time.events.loop(Phaser.Timer.SECOND , function(){
	    //     //     t.rota = Math.PI-(2*Math.random()*Math.PI);
	    //     //     // t.rotation = t.rota - Math.PI / 2;
	    //     //     t.eye.rotation = t.rota - Math.PI / 2;
	    //     //     game.physics.arcade.velocityFromRotation(t.rota, t.speed, t.body.velocity);
	    //     // }, this);
	        
	    // }
	}

	// 蛇头探路者碰到物体时自动转向
	Snake.prototype.zhuanxiang = function() {
	    var t = this;
	    t.body.angularVelocity = 600;
	    t.rota = t.rotation;
	    t.move();
	}

	Snake.prototype.putBoom = function() {
	    if(this.isPuttingBoom === false) {
	        this.isPuttingBoom = true;
	        putBoomEvent[this.name] = this.game.time.events.loop(Phaser.Timer.SECOND *0.3, this.isPutting, this);
	    }
	}

	Snake.prototype.isPutting = function(){
	    // 如果是玩家自己要检查是否还有炸弹，如果是其他小蛇，那么不检查剩余炸弹数
	    if((_GameInfo[this.name].score >= 4 && this.name === userKey) || this.name !== userKey ) {
	        var pos = this.section[_GameInfo[this.name].len].position;
	        var boom = zhadanLayer.create(pos.x, pos.y, 'boom', _GameInfo[this.name].color);
	        boom.owner = this.name;
	        boom.anchor.setTo(0.5,0.5);
	        boom.scale.setTo(0.65);
	        boom.body.setCircle(10);
	        boom.alpha=0.6;
	        _GameInfo[this.name].score -=4;
	    }
	}

	Snake.prototype.stopPutBoom = function(){
	    if(this.isPuttingBoom === true) {
	        this.isPuttingBoom = false;
	        this.game.time.events.remove(putBoomEvent[this.name]);
	    }
	}

	Snake.prototype.update = function() {
	    var t = this;

	    // 根据朝向更新小蛇移动,并且把位置信息同步给服务器
	    if(this.name === userKey) {
	        this.move();
	        // console.log(t.x)
	        // console.log(t.y)
	        // 向服务器同步信息
	        socket.emit('sync info ' + roomUuid, {
	                    user:userKey,
	                    action:'position',
	                    data:{
	                        ix:t.x - halfW,
	                        iy:t.y - halfH
	                    }
	                });

	        // socket.emit('sync info ' + roomUuid,  {
	        //     data:userKey + '/' + 'position' + '/' + (t.x-halfW) + '/' + (t.y-halfH)
	        // });
	    }else {
	        // console.log(+(+(_GameInfo[this.name].ix) + halfW))
	        this.game.physics.arcade.moveToXY(t, +(+(_GameInfo[this.name].ix) + halfW), +(+(_GameInfo[this.name].iy) + halfH), 120);
	        // t.x = _GameInfo[this.name].ix + halfW;
	        // t.y = _GameInfo[this.name].iy + halfH;
	    }


	    // 更新小蛇的身体位置
	    var part = t.childPath.pop();
	    part.setTo(t.x, t.y);
	    t.childPath.unshift(part);
	    for (var i = 1; i <= t.len; i++) {
	        // t.getSectionPos(t.childPath[i - 1], i, t.rotation);
	        t.section[i].x = t.childPath[i * t.space].x;
	        t.section[i].y = t.childPath[i * t.space].y;
	    }

	    //监听是否放炸弹 
	    if(_GameInfo[this.name].putboom === 'true') {
	        this.putBoom();
	        // console.log('dddd')
	    } else {
	        this.stopPutBoom();
	        // console.log('ssss')
	    }

	    if(_GameInfo[this.name].isDead === true) {
	        this.dead();
	    }
	}

	module.exports = Snake;


/***/ }
/******/ ]);