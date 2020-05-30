
var BaseComponent = require("BaseComponent")

cc.Class({
    extends: BaseComponent,

    properties: {
        txtPopPrefab: cc.Node,

        nodeTargetCoin:cc.Node,

        radius: 100
    },

    start: function() {

        //监听金币事件
        //cc.systemEvent.on("FLY_COIN",this.flyCoin.bind(this));

        this.gyRegEvent(window.GL.EventDef._msg_fly_coin,this.flyCoin,this);



        this.m_coinPool = new cc.NodePool()
        for (var i = 0; i < 10; i++) {
            var node = cc.instantiate(this.txtPopPrefab)
            this.m_coinPool.put(node);
        }
    },

    getCoinNode: function() {
        if (this.m_coinPool.size() > 0) {
            return this.m_coinPool.get()
        } else {
            return cc.instantiate(this.txtPopPrefab)
        }
    },

    play: function(point, targetPoint,number) {
        number = number || 10;
        var p1 = this.node.convertToNodeSpaceAR(point);
        targetPoint = this.node.convertToNodeSpaceAR(targetPoint);

        var playCallback = function(_coin) {
            var actions2 = []
            _coin.scale = 0
            var spawn1 = cc.spawn(cc.scaleTo(0.3, 1), cc.moveTo(0.3, p2));

            var time =  window.GL.GLFunc.randomInt(3,6);                                                  //随机3到6其中一个数字

            actions2.push(spawn1);
            actions2.push(cc.delayTime(0.3));
            actions2.push(cc.moveTo(time * 0.1, targetPoint));
            actions2.push(cc.callFunc(function() {
                this.m_coinPool.put(_coin);
            }, this))
            var sq1 = cc.sequence(actions2)
            _coin.stopAllActions()
            _coin.runAction(sq1)
        }.bind(this)

        var _angle =  360 / (number);              //360 / 10
        for (var i = 0; i < number*2; i++) {
            var angle = Math.PI / (number*2) * (_angle * i)
            var p2 = cc.v2(Math.cos(angle), Math.sin(angle)).mulSelf(this.radius).addSelf(p1);
            var coin = this.getCoinNode()
            coin.parent = this.node
            coin.position = p1;
            coin.active = true;
            playCallback(coin);
        }
    },




    //需要传一个obj ,属性 point 与 targetPoint （可以传节点，可以传坐标)
    flyCoin(obj){

        //起点
        let point  = null ; //= obj.point;


        if(obj.point.parent){                         //传递的是节点
            //父节点
            let pointNodeParent = obj.point.parent;
            //转世界坐标
            point = pointNodeParent.convertToWorldSpaceAR(obj.point.position);
        }else{
            point = obj.point;                        //传递的是坐标
        }

        //终点
        let targetPoint = null;
        if(obj.targetPoint == null){
            obj.targetPoint =  this.nodeTargetCoin;
        }

        if(obj.targetPoint.parent){                   //传递的是节点

            //父节点
            let targetNodeParent = obj.targetPoint.parent;
            //先转世界坐标
            targetPoint = targetNodeParent.convertToWorldSpaceAR(obj.targetPoint.position);
        }else{
            targetPoint = obj.targetPoint;             //传递的是坐标
        }

        //
        this.play(point,targetPoint);
    },
});


