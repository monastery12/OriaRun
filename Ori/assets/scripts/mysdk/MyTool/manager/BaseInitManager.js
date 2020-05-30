

cc.Class({
    extends: cc.Component,

    properties: {

        openBGMusic:true,

    },

    start () {

        if(this.openBGMusic && !window.GL.TEST){
            window.GL.AudioManager.playBG('BG',true);
        }

    },
});
