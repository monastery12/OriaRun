

cc.Class({
    extends: cc.Component,

    properties: {

    },



    start () {

    },

    BtnClickJump(){
        GL.MessageCenter.emit(GL.EventDef._msg_begin_jump);
    },


});
