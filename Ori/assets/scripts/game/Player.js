var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        rigidBody:cc.RigidBody,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_begin_jump,this.beginJump,this);
    },

    //准备起跳
    beginJump(){

        // let allSpeed = 500;
        // let moveX = allSpeed * GL.GameModel.getControlMoveBiliX();
        // let moveY = allSpeed * GL.GameModel.getControlMoveBiliY();
        //
        // this.rigidBody.linearVelocity = cc.v2(moveX, moveY );
        //
        // this.rigidBody.angularVelocity = moveX;

        // 或者直接施加力到刚体的质心上
        let li = 200000;
        let liX = li * GL.GameModel.getControlMoveBiliX();
        let liY = li * GL.GameModel.getControlMoveBiliY();
        let force = cc.v2(liX,liY);
        this.rigidBody.applyForceToCenter(force,true);

        // let cl = 300;
        // let clX = cl * GL.GameModel.getControlMoveBiliX();
        // let clY = cl * GL.GameModel.getControlMoveBiliY();
        // let impulse = cc.v2(clX,clY);
        // this.rigidBody.applyLinearImpulse(impulse,cc.v2(0,0), true );
    },



});
