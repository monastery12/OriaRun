
var NodePoolManager = {

    _manNum:0,
    _poolNum:20,

    //初次装载
    init(targetNode){

        this._targetNode = targetNode;

        //创建内存池
        this._NodePool = new cc.NodePool();

        for( let i = 0 ; i < this._poolNum ; i++ ){

            let nodeItem = cc.instantiate(targetNode);
            this._NodePool.put(nodeItem);
        }

        window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
    },

    //获取
    pushNode(){
        let nodeItem ;
        if ( this._NodePool.size() > 0 ) {
            nodeItem = this._NodePool.get();
        } else {
            nodeItem = cc.instantiate(this._targetNode);
        }
        this._manNum += 1;
        return nodeItem;
    },

    //回收
    recycleNode(targetNode){
        this._manNum -= 1;
        targetNode.children[0].active = false;
        targetNode.removeFromParent(true);
        this._NodePool.put(targetNode);
    },

};

module.exports = NodePoolManager;