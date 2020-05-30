var SDK_4399 = {


    isLogin:false,                                          //是否登陆
    uId:null,                                               //用户id
    userName:"",                                            //用户名
    instruct:null,

    getVideoCanPlay(callBackSucess,callBackFail,target){
        window.h5api.canPlayAd(function (data) {
            if(data.canPlayAd && data.remain > 0 ){
                callBackSucess && callBackSucess.call(target);
            }else{
                callBackFail && callBackFail.call(target);
            }
        })
    },

    //获取广告并播放
    vidio:function( finishedCallback){
        var self = this
        /**
        * 获得是否可以播放广告及剩余次数
        * @param {func} callback 回调函数
        * @return boolean 是否可播放
        */
        window.h5api.canPlayAd(callback)   
 
        /**
        * 广告状态回调函数
        * @param {object} data 状态
        */
        function callback(data) {
                console.log("是否可播放广告", data.canPlayAd, "剩余次数", data.remain)
                if(data.canPlayAd && data.remain > 0 ){
                    self.playAdAssest(finishedCallback);
                }else{
                    //通知广告不可用
                    // if(finishedCallback)
                    //   finishedCallback(false)
                    window.GL.MessageCenter.emit(window.GL.EventDef._msg_open_ui,'Tip');
                }
        }
    },

    //播放视频
    playAdAssest:function(finishedCallback){
        /**
        * 播放全屏广告
        * @param callback   播放广告时的广告状态回调函数
        */
       var self = this;
        window.h5api.playAd(callback)
        /**
        * 此callback回调函数的形式
        *
        * @param obj  广告状态
        */
        function callback(obj){
            console.log('代码:' + obj.code + ',消息:' + obj.message)
            if(obj.code === 10000){
                console.log('开始播放')
            } else if(obj.code === 10001){
                console.log(finishedCallback);
                if(finishedCallback)
                    finishedCallback(true)
                console.log('播放结束')
                //cc.systemEvent.emit(self.instruct);
            } else {
                if(finishedCallback)
                    finishedCallback(false)
                //通知广告异常
                console.log('广告异常')
            }
        }
    },

    //分享好友
    share:function(){
        /**
        * 调用分享
        */
        window.h5api.share();
    },

    getIsLogin:function(){
        /**
        * 是否登录
        * ?会返回值吗，还是回调？文档暂时没看到
        */
        this.isLogin = window.h5api.isLogin()
    },

    //打开登陆面板，只有再游戏进入后第一次打开才会显示登陆面板，后面调用只会收到回掉函数
    openLogin:function(){
        /**
        * 打开用户登录面板
        * @param {func} callback 回调函数
        */
        var self = this;
        window.h5api.login(function(data) {                 //用户登录成功后会返回用户的编号跟用户昵称
            /* data = {
            uId: 1234567, // 用户编号
            userName: '昵称', // 用户昵称
            } */
            self.uId = data.uId;                            //保持uid跟名称
            self.userName = data.userName;
            console.log("********************登陆返回uid:",data.uId);
            console.log("********************登陆返回username:",data.userName);
        })
    },


    //获取头像
    getHeadIcon:function(uid){
        /**
        * 获得用户头像地址，高宽为120*120像素
        * @param {String} uid 用户编号
        */
        if(uid == null){
            uid = this.uId;
        }
        window.h5api.getUserAvatar(uid)
    },

    //获取小头像
    getHeadIconSmall:function(uid){
         /**
        * 获得用户小头像地址，高宽为48*48像素
        * @param {String} uid 用户编号
        */
       if(uid == null){
        uid = this.uId;
       }
       window.h5api.getUserSmallAvatar(uid)
    },

    //获取大头像
    getHeadIconBig:function(uid){
        /**
        * 获得用户大头像地址，高宽为200*200像素
        * @param {String} uid 用户编号
        */
       if(uid == null){
        uid = this.uId;
       }
       window.h5api.getUserBigAvatar(uid)
    },

    //打开登陆面板，只有再游戏进入后第一次打开才会显示登陆面板，后面调用只会收到回掉函数
    openLogin:function(){
        /**
         * 打开用户登录面板
         * @param {func} callback 回调函数
         */
        var self = this;
        window.h5api.login(function(data) {                 //用户登录成功后会返回用户的编号跟用户昵称
            /* data = {
            uId: 1234567, // 用户编号
            userName: '昵称', // 用户昵称
            } */
            self.uId = data.uId;                            //保持uid跟名称
            self.userName = data.userName;
            console.log("********************登陆返回uid:",data.uId);
            console.log("********************登陆返回username:",data.userName);
        })
    },

    commitRank(id,score,callbackSucess,callbackFail){
        /**
         * 提交排名
         * @param 详见输入参数
         */
        window.h5api.submitRankScore(id, score, function (res) {
            let code = res.code;
            callbackSucess && callbackSucess();
        });
    },

    openRank(){
        /**
         * 展示排行榜面板
         */
        window.h5api.showRankList()
    },

    moreGame(){
        // 调用推荐弹窗
        window.h5api.showRecommend();
    },
}

module.exports = SDK_4399;