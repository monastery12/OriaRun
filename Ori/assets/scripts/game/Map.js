

cc.Class({
    extends: cc.Component,

    properties: {
        ObstructItem:cc.Prefab,
    },


    start () {
        this.initMap();
    },

    initMap(){

        let num = 10;
        for(let i = 0 ; i < num ; i++){
            let ObstructItem = cc.instantiate(this.ObstructItem);
            ObstructItem.setParent(this.node);

            let height = i * (this.node.height/10);
            let width = GL.GLFunc.randomInt(-300,300);

            ObstructItem.setPosition(width,height);
        }

        this._gameBegin = true;
    },

});
