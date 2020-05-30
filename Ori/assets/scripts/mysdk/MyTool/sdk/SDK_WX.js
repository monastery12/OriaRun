/**
 * 微信sdk
 * @type {{share: SDK_WX.share}}
 */

var SDK_WX = {

    rewardedVideoAd:null,       //视频激励广告


    //分享通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query
    share:function (callBackFunc) {
        let obj = {};
        obj.title = window.GL.Conf.shareTitle;
        obj.imageUrl = window.GL.Conf.shareImageUrl;
        obj.query = window.GL.Conf.shareQuery;
        obj.success = callBackFunc;
        wx.shareAppMessage(obj);
    },

    //通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query
    invite:function (callBackFunc) {
        let obj = {};
        obj.title = window.GL.Conf.shareTitle;
        obj.imageUrl = window.GL.Conf.shareImageUrl;
        obj.query = window.GL.Conf.inviteQuery;
        wx.shareAppMessage(obj);
    },

    //播放视频
    vidio:function (callBackFunc) {
        let self = this;

        if( this.rewardedVideoAd == null ){
            let ad = {};
            ad.adUnitId = window.GL.Conf.videoUnit;
            this.rewardedVideoAd =  wx.createRewardedVideoAd(ad);


            this.rewardedVideoAd.onLoad(() => {
                self.rewardedVideoAd.show();
            });

            this.rewardedVideoAd.onError(err => {
                console.log(err)
            });

            this.rewardedVideoAd.onClose(res => {
                if (res && res.isEnded || res === undefined) {
                    callBackFunc();
                }
                else {
                    //播放中途退出，不下发游戏奖励
                }
            })

        }else{
            this.rewardedVideoAd.show();
        }

    }
}
module.exports = SDK_WX