/**
 * 震动
 */

var Vibrate = {
    on: true,

    init() {
        //cc.sys.localStorage.setItem("vibrate",true);                                //默认true
        let on = cc.sys.localStorage.getItem("vibrate")
        if (on) {
            this.on = ("true" == on)
        } else {
            this.on = true
        }
    },

    short() {

        if(this.on){
            if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {

                if( cc.sys.browserType ==  cc.sys.BROWSER_TYPE_ANDROID ){
                    //反射安卓原生震动
                }
                return;
            }else{
                wx.vibrateShort({success: this.onSuccess, fail: this.onFail})
            }
        }

    },

    long() {

        if(this.on){
            if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {
                if( cc.sys.browserType ==  cc.sys.BROWSER_TYPE_ANDROID ){
                    //反射安卓原生震动
                }
                return;
            }else{
                wx.vibrateLong({success: this.onSuccess, fail: this.onFail})
            }
        }
    },

    onSuccess() {
    },

    onFail() {
    },

    switch() {
        this.on = !this.on
        cc.sys.localStorage.setItem("vibrate", `${this.on}`)
    },
}

module.exports = Vibrate
