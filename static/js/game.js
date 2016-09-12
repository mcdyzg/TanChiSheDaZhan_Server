(function(win, $) {

    // 屏幕尺寸
    var winW = $(window).width();
    var winH = $(window).height();

    $(document.body).css({
        width: winW + 'px',
        height: winH + 'px'
    });

    var yourCamp = 'h';
    // 棋子编号，用来吃子的时候做判断
    var PRIORITYMAP = {
        xiang: 10,
        shi: 9,
        hu: 8,
        bao: 7,
        lang: 6,
        gou: 5,
        mao: 4,
        shu: 3
    };

    // 计算棋盘上所有点的位置
    var points = new Array();
    // 存储棋盘上所有子
    var qizis = new Array();


    // 游戏初始化
    // 全屏创建
    var gameSize = winW - 20;
    win.game = new Phaser.Game(gameSize, gameSize, Phaser.WEBGL, 'game_container', {
        preload: preload,
        create: create,
        update: update
    });
    // 由于屏幕的分辨率的不一，棋子和棋盘的尺寸都是计算而来
    var gridSize, qiziSize;
    // 记录当前选中的棋子
    var currentInd = -1;
    // 记录当前点击的是哪个点。
    var tapInd;

    function preload() {
        game.load.image('qipan', '/assets/qipan.png');
        game.load.atlas('doushouqi', '/assets/dsq.png', '/assets/dsq.json');
    }

    function update() {

    }

    function create() {
        // 背景设置成白色，默认黑色#000
        game.stage.backgroundColor = '#FFF';
        // 棋盘距离边界的位置
        var padding = 10;
        // 游戏的尺寸 - 上下边界 / 4 目的计算出每个格子的高宽。正方形计算一边即可。
        gridSize = (gameSize - padding * 2) / 4;
        // 计算棋盘左上点的坐标位置
        var oriPoint = {
            x: gridSize / 2 + padding,
            y: gridSize / 2 + padding
        };
        var qipanImageSize = 458;
        var tileGrid = game.add.tileSprite(oriPoint.x, oriPoint.y, qipanImageSize, qipanImageSize, 'qipan');
        tileGrid.scale.setTo(gridSize * 3 / qipanImageSize);

        for (var i = 15; i >= 0; i--) {
            var dy = Math.floor(i / 4);
            var dx = i % 4;
            points[i] = {
                x: oriPoint.x + dx * gridSize,
                y: oriPoint.y + dy * gridSize,
                zind: i
            };
            _addQiZi(points[i], i);
        }
        qiziSize = qizis[0].width;

        game.input.onTap.add(_onTap, this);

    }

    function _onTap(pointer, doubleTap){


    }

    function _tapHandler(camp, pointer) {

        // if(!__GameInfo__.info[__GameInfo__.camp].isYourTurn) return;
        // 判断tap点，离棋盘上的点的位置，选取距离点击位置小于棋子半径的点。
        var dis;
        for (var i = 15; i >= 0; i--) {
            dis = Phaser.Math.distance(points[i].x, points[i].y, pointer.x, pointer.y);
            if (dis <= qiziSize / 2) {
                tapInd = i;
                break;
            }
        }
        // 获取点击位置的棋盘上的节点
        var pos = points[tapInd];
        // 判断当前节点上是否有棋子
        if (pos && pos.zind > -1) {
            var qizi = qizis[pos.zind];
            if (qizi.__info__.status === 'hide') {
                qizi.__info__.status = 'on';
                qizi.children[0].kill();
            } else if (qizi.__info__.camp === yourCamp) {
                currentInd = tapInd;
                qizi.scale.setTo(1);
            } else {
                var cqizi = qizis[currentInd];
                var cqizipos = points[cqizi.__info__.pid];
                if (cqizi && cqizi.__info__ && cqizi.__info__.status === 'on' && cqizi.__info__.camp === yourCamp && ((pos.x === cqizipos.x && Math.abs(pos.y - cqizipos.y) === gridSize) || (pos.y === cqizipos.y && Math.abs(pos.x - cqizipos.x) === gridSize))) {
                    _zouQi(cqizi, pos, qizi);
                }
            }
        } else {
            // 如果没有棋子，说明用户在走期。因为棋子只能是走到相邻的一个节点上。
            // 判断当前是否有选中相同阵营的棋子
            if (currentInd > -1) {
                var cqizi = qizis[currentInd];
                var cqizipos = points[cqizi.__info__.pid];
                if (
                    cqizi && cqizi.__info__ && cqizi.__info__.status === 'on' && 
                    cqizi.__info__.camp === yourCamp && 
                    ((pos.x === cqizipos.x && Math.abs(pos.y - cqizipos.y) === gridSize) || 
                    (pos.y === cqizipos.y && Math.abs(pos.x - cqizipos.x) === gridSize))
                ) {
                    _zouQi(cqizi, pos, tapInd);
                }
            } else {
                // 没有选中棋子
                // 这里最好可以播放提示音，比如滴滴声
                return false;
            }
        }

    }
    /* 
     * @desc 
     * 杀死棋子
     * @param
     * @qind - number - 死掉的棋子在棋子队列的位置
     * @pind - number - 死亡时的棋盘节点在位置数组的位置。
     */
    function _killQiZi(qizi) {
        qizis[qizi.__info__.qid] = '';
        qizi.kill();
    }
    /* 
     * @desc 
     * 把位置数组中某个位置值空
     * @param
     * @pid - number - 位置数组中的位置
     */
    function _killPoint(pid) {
        points[pid].zind = -1;
    }
    /* 
     * @desc 
     * 改变位置数组中某个位置的zind值
     * @param
     * @pid - number - 位置数组中的位置
     * @zind - number - 需要修改的值
     */
    function _changePoint(pid, zind) {
        points[pid].zind = zind;
    }
    /* 
     * @desc 
     * 走棋
     * @param
     * @qind - number - 主动吃的棋子在棋子队列的位置
     * @pind - number - 主动吃的时候棋盘节点在位置数组的位置。
     * @afind - number - 吃完了以后棋盘节点在位置数组的位置。
     */
    function _zouQi(cqizi, pos, qizi) {
        var _tween = game.add.tween(cqizi);
        _tween.to({
            x: pos.x,
            y: pos.y
        }, 40, Phaser.Easing.Bounce.Out, true);
        // 棋子移动完成后的逻辑操作
        _tween.onComplete.addOnce(function() {
            if (qizi && qizi.__info__) {
                // 情况有3种
                // 走棋的子和目标子大小一样，同死
                if (cqizi.__info__.priority === qizi.__info__.priority) {
                    _killPoint(cqizi.__info__.pid);
                    _killQiZi(cqizi);
                    _killPoint(qizi.__info__.pid);
                    _killQiZi(qizi);
                } else if ((cqizi.__info__.priority === 10 && qizi.__info__.priority === 3) || (cqizi.__info__.priority < qizi.__info__.priority)) {
                    // 走棋的子被吃掉
                    _killPoint(cqizi.__info__.pid);
                    _killQiZi(cqizi);
                } else if ((cqizi.__info__.priority === 3 && qizi.__info__.priority === 10) || (cqizi.__info__.priority > qizi.__info__.priority)) {
                    // 走棋的子吃掉目标子
                    cqizi.__info__.pid = qizi.__info__.pid;
                    _changePoint(qizi.__info__.pid, cqizi.__info__.qid);
                    _killPoint(qizi.__info__.pid);
                    _killQiZi(qizi);
                }
            } else {
                _killPoint(cqizi.__info__.pid);
                _changePoint(qizi, cqizi.__info__.qid);
                cqizi.__info__.pid = qizi;
            }
        }, this);
    }

    function _addQiZi(pos, ind) {
        var qi = __GameInfo__.info.qizi[ind];
        qizis[ind] = game.add.sprite(pos.x, pos.y, 'doushouqi', qi);
        qizis[ind].anchor.setTo(0.5);
        qizis[ind].scale.setTo((gridSize - 20) / qizis[ind].width);
        var nns = qi.split('-');
        qizis[ind].__info__ = {
            name: nns[1],
            camp: nns[0],
            status: 'hide', // 'hide' -- 未翻出 'on' -- 已经翻出 
            priority: PRIORITYMAP[nns[1]],
            qid: ind, // 棋子在棋子数组中的位置
            pid: ind // 棋子位置在位置数组中的位置
        };

        var bg = qizis[ind].addChild(game.make.sprite(0, 0, 'doushouqi', 'bg'));
        bg.anchor.setTo(0.5);
    }

    function _handleClick() {
        //  Input Enable the sprites
        atari1.inputEnabled = true;
        //  Allow dragging - the 'true' parameter will make the sprite snap to the center
        atari1.input.enableDrag(true);
    }

})(window, jQuery);
