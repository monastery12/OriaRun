var ColorManager = {

    setGray(node){
        node.color = new cc.Color(128,128,128);
    },

    setNodeByColorNum(node,num1,num2,num3){
        node.color = new cc.Color(num1,num2,num3);
    },

    // 橙 252  139  41
    // 绿 40  187  89
    // 蓝 0  146   253
    // 红253  61  54

    //1
    setGreen(node){
        node.color = new cc.Color(40,187,89);
    },

    //2
    setBlue(node){
        node.color = new cc.Color(0,146,253);
    },

    //3
    setYellow(node){
        node.color = new cc.Color(252,139,41);
    },

    //4
    setRed(node){
        node.color = new cc.Color(253,61,54);
    },

    setColorAToColorB(colora,colorb,node){

        if(node._runIng){
            return ;
        }

        node._runIng = true;
        let action_1 = cc.callFunc(function () {
            node.color = colora;
        },this);
        let action_2 = cc.tintTo(0.5, 228,47, 47);
        let action_2_2 = cc.tintTo(0.5,255,255,255);
        let action_3 = cc.sequence(action_2,action_2_2);


        node.runAction( cc.repeatForever(action_3) );
    },

    //
    setWrite(node){
        node.color = new cc.Color(255,255,255);
        node.stopAllActions();
        node._runIng = false;
    },
};
module.exports = ColorManager;