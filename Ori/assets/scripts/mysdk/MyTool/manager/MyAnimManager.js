
var MyAnimManager = {

    //礼包动画
    getGiftBoxAnim(callFunc_1,callFunc_2,target,giftCount,lastFunc){

        let nCount = 0;

        let anim = cc.repeat(cc.sequence([

            cc.repeat(cc.sequence([

                cc.callFunc(()=>{
                    callFunc_1 && callFunc_1.call(target);
                }),
                cc.rotateTo(0.1,8),

                cc.rotateTo(0.1,-8),

            ]),2),

            cc.rotateTo(0.1,0),

            cc.callFunc(()=>{
                self.animNode.runAction(cc.sequence([

                    cc.scaleTo(0.2,1.15,0.8),

                    cc.scaleTo(0.4,0.95,1.1),

                    cc.callFunc(()=>{

                        nCount++;

                        callFunc_2 && callFunc_2.call(target,nCount);

                        if(nCount == giftCount){
                            lastFunc && lastFunc.call(target);
                        }
                    }),
                    cc.scaleTo(0.3,1,1),
                ]));
            })
        ]),giftCount)

        return anim;
    },

    //抖动
    shakeAnim(shakeNode,rotateAngle){

        let rotateTime = 0.3;
        rotateAngle = rotateAngle || 20;
        let rotate_1 = cc.rotateTo(rotateTime/2,rotateAngle);
        let rotate_2 = cc.rotateTo(rotateTime,0);
        let rotate_3 = cc.rotateTo(rotateTime/2,-rotateAngle);
        let rotate_4 = cc.rotateTo(rotateTime,0);

        shakeNode.runAction( cc.repeatForever( cc.sequence(rotate_1,rotate_2,rotate_3,rotate_4) )  );

    },

    //展开
    spreadAnim(spreadNode,showTime){

        spreadNode.scaleY = 0;
        spreadNode.scaleX = 1;
        spreadNode.opacity = 0;

        showTime = showTime || 0.15;

        let action_1 = cc.scaleTo(showTime,1);
        let action_2 = cc.fadeTo(showTime,255);
        spreadNode.runAction( cc.spawn(action_1,action_2) );
    },

    //横向转开
    spreadAnimHori(spreadNode,showTime){
        spreadNode.scaleY = 1;
        spreadNode.scaleX = 0;
        spreadNode.opacity = 0;

        showTime = showTime || 0.15;

        let action_1 = cc.scaleTo(showTime,1,1);
        let action_2 = cc.fadeTo(showTime,255);
        spreadNode.runAction( cc.spawn(action_1,action_2) );
    },

    //震动震屏
    shakeScreenAnim(sceenNode){

        let shakeAnim = cc.repeatForever(
            cc.sequence(
                cc.moveTo(0.02, cc.p(5, 7)),
                cc.moveTo(0.02, cc.p(-6, 7)),
                cc.moveTo(0.02, cc.p(-13, 3)),
                cc.moveTo(0.02, cc.p(3, -6)),
                cc.moveTo(0.02, cc.p(-5, 5)),
                cc.moveTo(0.02, cc.p(2, -8)),
                cc.moveTo(0.02, cc.p(-8, -10)),
                cc.moveTo(0.02, cc.p(3, 10)),
                cc.moveTo(0.02, cc.p(0, 0))
            )
        );

        sceenNode.runAction(shakeAnim);
    },

    //圆动作
    circleMoveAnim(moveNode,rate,radius){
        //搁浅
    },

    //数字增加
    numAddNum(label,num,addNum){
        let sum = num + addNum;

        let interNum = Integer.toString( Math.trunc(addNum) ) ;             //字符串
        let pointNum = Integer.toString( addNum - Math.trunc(addNum) ) ;

        let IntAddArr = [];
        for(let i = 0 ; i <  interNum.length ; i++){
            IntAddArr.push( parseInt( interNum[i]) );
        }

        let PointAddArr = [];
        for(let i = 0 ; i < pointNum.length ; i++){
            PointAddArr.push( parseInt( pointNum[i]) );
        }

        let addFunc = function () {

        }

    },

    //简单数字增加
    numSimpleAdd(label,num,addNum){

        let interNum = 0.1;

        if(addNum < 0.1){
            interNum = 0.01
        }else {
            interNum = addNum / 10;
        }

        let  addFunc = function () {


            label.string = window.GL.GLFunc.truncPoint(num + interNum,2);
            addNum -= interNum;

            setTimeout(function () {
                while (addNum > 0){
                    addFunc();
                }
            },1000);
        }

        addFunc();
    },

    //飞向目标节点
    flyToTarget(flyNode,targetNode,callback){

        let tempNode = cc.instantiate(flyNode);
        tempNode.parent = flyNode.parent;
        tempNode.position = flyNode.position;

        let targetPoint = window.GL.PointManager.localToLocalPoint(targetNode,flyNode);

        let flyTime = 0.5;
        let action_1 = cc.moveTo(flyTime,targetPoint);
        let action_2 = cc.scaleTo(flyTime,0);
        tempNode.runAction(cc.spawn(action_1,action_2) );

        setTimeout(function () {
            tempNode.destroy();
            callback && callback();
        },flyTime*1000);
    },

    ShowNotEnough(father,item,showTime,showHeight,tipStr,callback,target){

        let itemNode = cc.instantiate(item);
        itemNode.setParent(father);
        itemNode.setPosition(0,0);

        itemNode.getComponent("TipNotEnough").init(tipStr);

        let moveTime = showTime || 1;
        let moveHeight = showHeight || 30;

        let action = cc.spawn( cc.moveBy(moveTime,cc.v2(0,moveHeight) ) , cc.fadeOut(moveTime)  );

        itemNode.runAction(action);

        setTimeout(function () {

            itemNode.destroy();             //销毁
            callback && callback.call(target);

        }.bind(this) , moveTime*1000);
    },
}

module.exports = MyAnimManager;