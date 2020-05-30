/**
 * 微信广告
 */

var AdManager = {

    init() {

        if(cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME){
            return ;
        }

        this.rewardAdSucc = null;                                       //奖励回调函数
        this.banner = null;
        this.wxSystem = wx.getSystemInfoSync();                         //拿手机型号

        this.createBanner();
        this.createRewardAd(window.GL.Conf.videoUnit);

    },

    //创建视频
    createRewardAd(id) {

        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: id });

        //视频广告  加载
        this.rewardAd.onLoad(function () {

        }.bind(this));

        //视频广告 报错
        this.rewardAd.onError(err => {
            window.GL.messageTip(`广告创建失败`)
        });

        //监听用户点击 关闭广告 按钮的事件
        this.rewardAd.onClose(function (res) {

            // 正常播放结束，可以下发游戏奖励
            if (res === undefined || (res && res.isEnded)) {
                this.rewardAdSucc && this.rewardAdSucc();
            } else {
                //window.GL.messageTips(`请观看完整广告，才能获取奖励`);
            }
            this.rewardAdLoaded = false;
        }.bind(this));
    },

    //播放视频
    playeRewardAd(succCallBack) {

        if (this.rewardAd  ) {

            this.rewardAdSucc = succCallBack;                                       //成功回调函数

            this.rewardAd.show().catch(                                             //show报错，那么
                err => {
                    console.log(err);


                    this.rewardAd.load().then(                                      //隐藏广告，再显示
                        () => {
                            this.rewardAd.show().catch (
                                twerr => {
                                    console.log(twerr);
                                    this.rewardAdSucc && this.rewardAdSucc();
                                }
                            )
                        }
                    );

                    return false;
                }
            );
            return true;
        }else{
            if(cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME){             //非微信环境，直接回掉
                succCallBack();
                return true;
            }else{
                return false;
            }
        }
    },


    //创建横幅广告
    createBanner() {                                                  //显示广告

        if (this.banner) {
            this.banner.destroy()
            this.banner = null
        }

        let w = this.wxSystem.windowWidth;                          //屏幕窗口宽度
        let h = this.wxSystem.windowHeight;                         //屏幕高度

        //创建广告
        this.banner = wx.createBannerAd({
            adUnitId: window.GL.Conf.bannerUnit,
            style: {                                                                        //大小
                left    : 0 ,
                top     : 200 - h,
                width   : w ,
                height  :200,
            }
        })
        this.banner.onError(err => {
            //创建横幅失败
        })
    },

    //隐藏横幅广告
    closeBanner()
    {
        if(this.banner){
            this.banner.hide();
        }
    },

    //显示横幅广告
    openBanner()
    {
        if(this.banner){
            this.banner.show();
        }
    },

}

module.exports = AdManager
