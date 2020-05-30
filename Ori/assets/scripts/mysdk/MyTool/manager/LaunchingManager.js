var BaseCompponent = require("BaseComponent");
var HttpMgr = require("HttpMgr");

const SUB_TIME = 1;                                   //分享时间
var LOAD_COUNT = 4;                                 //需要加载的资源个数

cc.Class({
    extends: BaseCompponent,

    properties:{
        progressBg:cc.Node,
        progressBarNode:cc.Node,
        iconFllow:cc.Node,
    },



    start (){

        // var WebSocketManager = require("WebSocketManager");
        // WebSocketManager.createWebSocket('ws://192.168.0.103:80');

        this.gyRegEvent(window.GL.EventDef._msg_load_assest,this.loadAssest,this);

        this._hideTime  = 0;
        this._loadCount = 0;

        this.iconFllowOX = this.iconFllow.x;
        this.init();

    },

    //普通初始化
    init(){
        //初始化微信
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){

            LOAD_COUNT ++;
            this.wxInit();
        }


        //1 网络初始化
        this.netInit();

        //2 加载配置文件
        window.GL.JsonData.readJsonDataFromDir();

        //3加载音乐
        window.GL.AudioManager.init();

        //4读取存档
        window.GL.SaveManager.init();
    },

    //微信初始化
    wxInit(){
        let self = this;
        //微信平台
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){

            //广告初始化
            //window.GL.AdManager.init();

            //微信游戏监听游戏状态
            wx.onShow(function (query) {
                self.gameShowCallBack(query);
            });
            wx.onHide(function () {
                self.gameHideCallBack();
            });

            //微信那个转发按钮
            wx.showShareMenu({withShareTicket:true});

            //微信那个反馈按钮
            // let fbObj = {
            //     type:"image",
            //     text:"",
            //     image:"路径",
            //     style:{
            //         left:0,
            //         top:0,
            //         width:100,
            //         height:50,                                //
            //         lineHeight:40,                            //行高
            //         backgroundColor: '#ff0000',               //背景色
            //         color: '#ffffff',                         //颜色
            //         textAlign: 'center',                      //剧中
            //         fontSize: 16,                             //字号
            //         borderRadius: 4,                          //边框圆角
            //         borderWidth:1,                            //边框宽度
            //     }
            //
            // }
            // wx.createFeedbackButton(fbObj)

            //微信登陆
            this.wxLogin();



        }
    },

    //网络初始化
    netInit(){

        /**
         * 请求服务器操作
         * 将数据赋值
         */
        let netData = null ;            //
        if(netData){
            window.GL.Conf.loadIngImag = "";
            window.GL.Conf.videoUnit = "";
            window.GL.Conf.guessUnit = "";
            window.GL.Conf.bannerUnit = "";
            window.GL.Conf.version = "";
            window.GL.Conf.shareTitle = "";
            window.GL.Conf.shareImageUrl = "";
            window.GL.Conf.inviteQuery = "";
            window.GL.Conf.shareQuery = "";
        }

        //通知加载完成
        window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
    },

    //加载资源回调
    loadAssest(){
        this._loadCount ++;

        this.iconFllowOX += this.progressBg.width / LOAD_COUNT;
        this.iconFllow.x = this.iconFllowOX;

        this.progressBarNode.scaleX = this._loadCount/LOAD_COUNT;

        //保证资源加载完毕才进入游戏
        if(this._loadCount === LOAD_COUNT ){
            window.GL.AudioManager.playBG('Bg',true);
            cc.director.loadScene("menu");
        }
    },

    //---------------------------------------------------微信数据----------------------------------------------//

    //游戏隐藏
    gameHideCallBack(){
        this._hideTime = (new Date()).getTime();
    },

    //游戏显示
    gameShowCallBack(query){

        //处理分享
        if( window.GL.Share.shareCallBackFunc ){
            let showTime = (new Date()).getTime();
            let subTime = (showTime - this._hideTime)/1000;             //时间差,单位:秒
            if( subTime > SUB_TIME ){
                //分享成功
                window.GL.Share.runShare();
            }else{
                //分享失败
                window.GL.Share.shareCallBackFunc = null;
            }
        }else{
            //非分享，普通切换状态
        }
    },

    //微信登陆
    wxLogin(){
        wx.login({
            success : this.wxLoginSucc.bind(this),

            fail : this.wxLoginFail.bind(this),

            complete : function(){

            }
        });
    },

    //登陆成功
    wxLoginSucc(res){
        //let systemInfo = wx.getSystemInfoSync();            //获取设备信息

        //向主线程发送消息
        // wx.postMessage({
        //     message: 'SetUserInfo',
        //     openId : "aaa"
        // });
        //请求权限
        // wx.authorize({
        //     scope: 'scope.userInfo',
        //     success () {
        //         authorizeCallback();
        //     }
        // })

        //获取用户信息，需要授权
        // function authorizeCallback(){
        //     wx.getUserInfo({
        //         success: function(res) {
        //             let userInfo = res.userInfo;
        //             window.GL.UserInfo.nickName    = userInfo.nickName
        //             window.GL.UserInfo.avatarUrl   = userInfo.avatarUrl
        //             window.GL.UserInfo.gender      = userInfo.gender       //性别 0：未知、1：男、2：女
        //             window.GL.UserInfo.province    = userInfo.province
        //             window.GL.UserInfo.city        = userInfo.city
        //             window.GL.UserInfo.country     = userInfo.country
        //
        //             //通知加载完成
        //             window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
        //         }
        //     })
        // }

        // let wxSystem = wx.getSystemInfoSync();                          //拿手机型号
        // let w = wxSystem.windowWidth;                                   //屏幕窗口宽度
        // let btnLeft = (w - BTN_WIDTH) / 2 ;
        //let h = wxSystem.windowHeight;                                //屏幕高度

        //创建用户按钮
        // let userInfoButton = wx.createUserInfoButton({
        //     type: 'text',
        //     text:'开始游戏',
        //     // type:'image',
        //     // image: './res/btn_begin.png',
        //     style: {
        //         left: btnLeft,
        //         top: 200,
        //         width: BTN_WIDTH,
        //         height: 40,
        //         lineHeight: 40,
        //         backgroundColor: '#ff0000',
        //         color: '#ffffff',
        //         textAlign: 'center',
        //         fontSize: 16,
        //         borderRadius: 4,
        //     }
        // });

        // userInfoButton.onTap((res) => {
        //     let userInfo = res.userInfo;
        //     window.GL.UserInfo.nickName    = userInfo.nickName
        //     window.GL.UserInfo.avatarUrl   = userInfo.avatarUrl
        //     window.GL.UserInfo.gender      = userInfo.gender       //性别 0：未知、1：男、2：女
        //     window.GL.UserInfo.province    = userInfo.province
        //     window.GL.UserInfo.city        = userInfo.city
        //     window.GL.UserInfo.country     = userInfo.country
        //     //通知加载完成
        //     window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
        //     userInfoButton.destroy()
        // });

        //res.code 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
        // wx.request({
        //     url: '服务器请求地址',
        //     data:{
        //         code:res.code
        //     },
        //     success: function (res) {
        //         console.log("*****************请求openid = ",res);
        //     }
        // });
        //window.GL.HttpComponent.getUserId(res.code);

        //通知加载完成
        window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
    },

    //登陆失败
    wxLoginFail(){
        window.GL.messageTip(`请检查网络，重新登陆中`)
        setTimeout(this.wxLogin.bind(this), 500);
    },

});
