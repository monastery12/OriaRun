
var GameModel = {

    //控制器是否按下了
    _controlTouchStart:false,

    //正在起跳中
    _jumpIng:false,

    //计算x和y的速度
    _controlMoveX:0,
    _controlMoveY:0,

    setControlTouchStartOn(){
        this._controlTouchStart = true;
    },

    setControlTouchStartOff(){
        this._controlTouchStart = false;
    },

    getControlTouchStart(){
        return this._controlTouchStart;
    },

    setJumpIngOn(){
        this._jumpIng = true;
    },

    setJumpIngOff(){
        this._jumpIng = false;
    },

    getJumpIng(){
        return this._jumpIng;
    },

    setControlMoveX(val){
        this._controlMoveX = val;
    },
    setControlMoveY(val){
        this._controlMoveY = val;
    },

    getControlMoveBiliX(){
        if( !this._controlMoveY && !this._controlMoveX ){
            return 0;
        }
        return this._controlMoveX / ( this._controlMoveX + this._controlMoveY );
    },

    getControlMoveBiliY(){
        if( !this._controlMoveY && !this._controlMoveX ){
            return 0;
        }
        return this._controlMoveY / (this._controlMoveX + this._controlMoveY );
    },

};

module.exports = GameModel;