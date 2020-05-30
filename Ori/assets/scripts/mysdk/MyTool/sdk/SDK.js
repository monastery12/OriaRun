var SDK = {

    platforms:{
        Wx:1,
        Four_399:2,
        Qq:3,
        Op:4,
        Vv:5,
        Fb:6,
    },

    platform:2,                 //选择接入的平台sdk

    share:function (callBackFunc) {
        switch (this.platform) {
            case this.platforms.Wx          : window.GL.SDK_WX.share(callBackFunc);        break;
            case this.platforms.Four_399    : window.GL.SDK_4399.share(callBackFunc) ;     break;
            case this.platforms.Qq          :                            break;
            case this.platforms.Op          :                            break;
            case this.platforms.Vv          :                        break;
            case this.platforms.Fb          :                        break;
        }

    },

    login:function (callBackFunc) {
        switch (this.platform) {
            case this.platforms.Wx          :           break;
            case this.platforms.Four_399    : window.GL.SDK_4399.openLogin() ;   break;
            case this.platforms.Qq          :        break;
            case this.platforms.Op          :        break;
            case this.platforms.Vv          :        break;
            case this.platforms.Fb          :        break;
        }
    },

    vidio:function (callBackFunc) {
        switch (this.platform) {
            case this.platforms.Wx          : window.GL.SDK_WX.vidio(callBackFunc);   break;
            case this.platforms.Four_399    : window.GL.SDK_4399.vidio(callBackFunc) ;   break;
            case this.platforms.Qq          :        break;
            case this.platforms.Op          :        break;
            case this.platforms.Vv          :        break;
            case this.platforms.Fb          :        break;
        }
    },
}

module.exports = SDK