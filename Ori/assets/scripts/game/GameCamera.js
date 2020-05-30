

cc.Class({
    extends: cc.Component,

    properties: {
        speed:300,
    },


    start () {

    },

    update(dt){

        this.node.y += this.speed * dt ;
    }
});
