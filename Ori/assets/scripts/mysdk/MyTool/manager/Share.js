/**
 *分享游戏
 * 调用shareGame(分享回调) 即可
 */

var Share = {
    shareCallBackFunc:null,
    _target:null,
    _videoPath:null,

    runShare(){
        if(this.shareCallBackFunc){
            this.shareCallBackFunc.call(this._target);
            this.shareCallBackFunc = null;
        }
    },

    init() {
    },

    //分享游戏
    shareGame(callBack,target) {
        if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {
            callBack && callBack.call(target);
            return;
        }

        this.shareCallBackFunc = callBack;
        this._target = target;

        //触发wx.onshow 跟wx.onhide
        wx.shareAppMessage({
            title       :window.GL.Conf.shareTitle,
            imageUrl    :window.GL.Conf.shareImageUrl,
            query       :{data:'测试分享'} ,

            //微信没有分享成功回调
            // success() {
            //     window.GL.messageTip('分享成功');
            // },
            // fail(e) {
            //     window.GL.messageTip('分享失败');
            // }
        });
    },

    //录屏分享头条才有
    beginLupin(){

        if(! CC_WECHATGAME ){
            return ;
        }

        if( !(window.GL._platform ==  'TT') ){
            return ;
        }

        if(this._videoPath){
            return ;
        }
        this._recorder = tt.getGameRecorderManager();

        let self = this;

        //监听录制
        this._recorder.onStart(res => {
            self._videoPath = null;
        });

        //开始录制
        this.recorder.start({
            duration: 100
        });

        //避免录制过久
        this.schedule(function () {
            self._recorder.pause();
        },99);
    },

    //停止录屏
    stopLupin(callFunc,target){

        if(window.GL._platform == '4399' || window.GL._platform == 'WX'){
            this.normalShare();
            return ;
        }
        
        if(! CC_WECHATGAME ){
            return ;
        }
        if( !(window.GL._platform ==  'TT') ){
            return ;
        }

        if( this._videoPath ){
            callFunc && callFunc.call(target);
            return ;
        }

        this._recorder.onError(function () {

        });

        let self = this;
        this._recorder.onStop(res => {
            self._videoPath = res.videoPath;
            callFunc && callFunc.call(target);
        });

        this._recorder.stop();
    },

    //录屏分享
    shareLupin(callFuncFail,target){

        if(window.GL._platform == '4399' || window.GL._platform == 'WX'){
            this.normalShare();
            return ;
        }

        if(! CC_WECHATGAME){
            return ;
        }

        if( !(window.GL._platform ==  'TT') ){
            return ;
        }

        if(!this._videoPath){
            callFuncFail && callFuncFail.call(target);
            return ;
        }

        let self = this;

        tt.shareAppMessage({
            channel: "video",
            title: window.GL.Conf.shareTitle,
            desc: "头条分享秒速",
            extra: {
                videoPath: self._videoPath,         // 可替换成录屏得到的视频地址
                videoTopics: ["这个描述只会在抖音才有", "抖音专用"]
            },
            success() {
                self._videoPath = null;
                self.beginLupin();
            },
            fail(e) {
                if( e.errMsg.includes('fail') ){
                    //分享失败
                    callFuncFail && callFuncFail.call(target);
                }else{
                    //取消了分享
                }
            }
        });
    },

    normalShare(){
        if(window.GL._release){
            if(window.GL._platform == "4399"){

                window.GL.SDK_4399.share();
            }
            else if(window.GL._platform == "WX"|| window.GL._platform == 'TT'){
                this.shareGame(null,null);
            }
        }
    },

}

module.exports = Share
