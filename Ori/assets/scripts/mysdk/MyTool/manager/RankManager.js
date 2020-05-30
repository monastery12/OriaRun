var BaseComponent = require("BaseComponent")

cc.Class({
    extends: BaseComponent,

    properties: {
        rankNode:cc.Node,
        spriteRank:cc.Sprite,

    },



    start () {
        this.gyRegEvent(window.GL.EventDef._msg_rank,this.friendRank,this);
    },

    //好友金币排行榜
    friendRank() {

        //先刷新一次数据
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){

            //提交分数
            wx.postMessage({
                message: 'updateScore',
                score : window.GL.PlayerManager.level,
            });

            wx.postMessage({
                message: 'friendRank'                                                     //onMessage

            });

            this.rankShow();
        }
    },

    //下一页
    onNextPageClicked () {

        window.GL.AudioManager.playEffect("button",false);
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'nextPage'
            });
        }
    },

    //上一页
    onPrevPageClicked () {

        window.GL.AudioManager.playEffect("button",false);
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'prePage'
            });
        }
    },

    //好友排行榜
    rankShow () {
        if(!this._rankTex){
            this._rankTex = new cc.Texture2D();
            this._rankTex.height = this.node.height;
            this._rankTex.width = this.node.width;
        }
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){

            this._refreshUI = true;

            if (wx.getOpenDataContext !== undefined) {
                let openDataContext = wx.getOpenDataContext();
                let sharedCanvas = openDataContext.canvas;

                this._rankTex.initWithElement(sharedCanvas);
                this._rankTex.handleLoadedTexture();
                this.spriteRank.spriteFrame = new cc.SpriteFrame(this._rankTex);
                this.rankNode.active = true;
            }
        }
    },

    update(dt){
        if(this._refreshUI){
            this.rankShow();
        }
    },

    closeRank(){
        this.rankNode.active = false;
        this._refreshUI = false;
    },
});
