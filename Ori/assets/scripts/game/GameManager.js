

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
        cc.director.getPhysicsManager().enabled = true;

        cc.director.getPhysicsManager().debugDrawFlags = true;

        //重力设置
        //cc.director.getPhysicsManager().gravity = cc.v2(0, -640);

    },

    start () {

    },
});
