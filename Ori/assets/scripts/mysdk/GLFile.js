import { BASE } from "./SDK/index";

var GL = {

    _openShare:true,       //是否开放分享
    _canVideo:false,       //微信申请下视频设置true
    _release:true,        //正式打包设置为true

    //平台
    _platform: 'WX',    //'4399',

    _longCompress:false,
    _canClose:true,
    _offCanLinqu:false,
    No_Music_Effect:false,

    TEST:false,                                                  //

    //通用模块
    PlayerManager:          require('PlayerManager'),
    GLFunc:                 require('GLFunc'),
    PointManager:           require('PointManager'),
    MessageCenter:          require('MessageCenter'),
    EventDef:               require('EventDef'),
    AudioManager:           require('AudioManager'),
    JsonData:               require('JsonData'),
    NodePoolManager:        require('NodePoolManager'),
    BigNum:                 require('BigNum'),
    SaveManager:            require("SaveManager"),
    Share:                  require("Share"),
    AdManager:              require("AdManager"),
    SDK_4399:               require("SDK_4399"),
    CheckPlatform:          require("CheckPlatform"),
    MyAnimManager:          require("MyAnimManager"),

    TouchManager:           require("TouchManager"),

    //游戏模块
    GameModel:              require("GameModel"),


    Lib:{
        freeze:require("deep-freeze"),
        uikiller:require("uikiller"),
        async:require("async"),
        _ :require("underscore"),
    },

    Server:{
        httpUrl:"https://n5game.xyz:89/GestureGame/",
    },


    // 配置,若有服务器下发数据，则替换Conf
    Conf:{
        loadIngImag     :"",
        videoUnit       :"adunit-cfbc9522d2f58bb5",
        guessUnit       :["猜你喜欢id"],
        bannerUnit      :"adunit-133bca88c08a91e9 ",
        version         :"1.0.0",
        shareTitle      :"我不信你能一笔画完这个，不服来战",
        shareImageUrl   :"https://mmocgame.qpic.cn/wechatgame/IfVcibegN0RajvUUScib7e2iaVFwQooINfZCh9IF8xEzicJuAcj1Bpyr0YYq4CHBZXat/0",
        inviteQuery     :"invite",
        shareQuery      :"share",
        userId          :"00000",
    },

    //玩家信息
    UserInfo:{
        nickName :    "张三",
        avatarUrl:    "" ,
        gender:       1,    //性别 0：未知、1：男、2：女
        province:     "未知",
        city:         "未知",
        country:      "未知",
    },

}

window.GL = GL;
window.BASE = BASE;