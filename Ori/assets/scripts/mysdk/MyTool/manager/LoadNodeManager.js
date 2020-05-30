/**
 *加载弹窗节点
 */
var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        signNode:cc.Prefab,
        skinNode:cc.Prefab,
    },


    start () {
        this.init();
    },

    //加载初始化
    init(){

        let skinNode = cc.instantiate(this.skinNode);
        skinNode.setParent(this.node);

        //七天登陆
        this.checkSign();

    },


    checkSign(){

        let isNewDay = window.GL.GLFunc.isNewDay();
        if(isNewDay){

            let sginData = GL.PlayerManager.signData;
            for(let i = 0 ; i < sginData.length ; i++){
                if(!sginData[i]){
                    let signNode = cc.instantiate(this.signNode);
                    signNode.setParent(this.node);
                    return ;
                }
            }
        }

    },


});
