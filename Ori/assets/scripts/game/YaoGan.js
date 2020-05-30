

cc.Class({
    extends: cc.Component,

    properties: {
        control:cc.Node,
        radius:50,          //半径
    },


    start () {
        GL.TouchManager.addTouchStar(this.control,this.touchStart,this);
        GL.TouchManager.addTouchMove(this.control,this.touchMove,this);
        GL.TouchManager.addTouchEnd(this.control,this.touchEnd,this)
        GL.TouchManager.addTouchCancel(this.control,this.touchEnd,this)
    },

    touchStart(event){
        GL.GameModel.setControlTouchStartOn();
    },

    touchMove(event){

        let delta = event.getDelta();

        if( ! this.isControlCanMOve(this.control.x + delta.x , this.control.y + delta.y) ) return ;

        this.control.x += delta.x;
        this.control.y += delta.y;
    },

    touchEnd(event){
        this.control.x = 0 ;
        this.control.y = 0 ;

        GL.MessageCenter.emit(GL.EventDef._msg_begin_jump);
        GL.GameModel.setControlTouchStartOn();


    },

    //控制摇杆不能移动到外面去了
    isControlCanMOve(nextX,nextY){

        let distance = Math.pow( nextX , 2) + Math.pow( nextY , 2);
        return distance < Math.pow(this.radius,2) ;
    },



});
