
var GameModel = {

    //控制器是否按下了
    _controlTouchStart:false,

    //正在起跳中
    _jumpIng:false,

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

};

module.exports = GameModel;