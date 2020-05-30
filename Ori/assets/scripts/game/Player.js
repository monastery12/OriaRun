var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {

    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_begin_jump,this.beginJump,this);
    },

    //准备起跳
    beginJump(){

    },



});
