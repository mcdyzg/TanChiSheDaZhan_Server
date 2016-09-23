module.exports = 
// [{
//     name:'player0',
//     rota:1,
//     score:40,
//     len:8,
//     ix:168,
//     iy:107,
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player1',
//     rota:1,
//     score:40,
//     len:8,
//     ix:248,
//     iy:277,
//     color:'hei',
//     speed:120,
//     space:6
// }
// ,{
//     name:'player2',
//     rota:1,
//     score:40,
//     len:8,
//     ix:388,
//     iy:337,
//     color:'kafei',
//     speed:120,
//     space:6
// }
// ,{
//     name:'player3',
//     rota:3,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player4',
//     rota:4,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player5',
//     rota:5,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player6',
//     rota:5,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player7',
//     rota:5,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// },{
//     name:'player8',
//     rota:5,
//     score:40,
//     len:8,
//     ix:'',
//     iy:'',
//     color:'anhuang',
//     speed:120,
//     space:6
// }
// ];

{
    // 房间编号
    roomUuid:'',
    // 总玩家数
    totalUsers:2,
    // 剩余可加入的玩家个数
    leftUsers:2,
    // 是否正在进行游戏
    isPlaying:false,
    // 关于游戏的一些信息
    config:{
        dou:0
    },
    // 同步到客户端的游戏信息
    gameInfo:{
        "1":{
            rota:1,
            score:40,
            len:8,
            ix:168,
            iy:107,
            color:'anhuang',
            speed:120,
            space:6,
            nicheng:'',
            userKey:'',
            isDead:false,
            putboom:false
        },
        "2":{
            rota:1,
            score:40,
            len:8,
            ix:248,
            iy:277,
            color:'hei',
            speed:120,
            space:6,
            nicheng:'',
            userKey:'',
            isDead:false,
            putboom:false
        }
    },
    // 游戏名称
    gameName:'TanChiSheDaZhan'
}