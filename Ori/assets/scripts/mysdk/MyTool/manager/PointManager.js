

//处理坐标转换

var PointManager = {

    //局部转世界
    localToWorldPoint(targetNode){
        let fatherNode = targetNode.parent;
        let worldPoint =  fatherNode.convertToWorldSpaceAR(targetNode.position);
        return worldPoint;
    },

    localToLocalPoint(localNode_1,localNode_2){
        let worldPoint = localNode_1.parent.convertToWorldSpaceAR(localNode_1.position);
        let localPoint = localNode_2.parent.convertToNodeSpaceAR(worldPoint);
        return localPoint;
    },

    localToWorldPointByPoint(point,fatherNode){
        let worldPoint =  fatherNode.convertToWorldSpaceAR(point);
        return worldPoint;
    },

    //局部转世界
    localToWorldPointByPointAndFatherNode(point,fatherNode){
        let worldPoint =  fatherNode.convertToWorldSpaceAR(point);
        return worldPoint;
    },


    //世界转局部
    worldToLocalPoint(worldPoint,fatherNode){
        let localPoint = fatherNode.convertToNodeSpaceAR(worldPoint);
        return localPoint;
    },

    //直接将targetNode的局部坐标转为ntxtNode的坐标
    originToTargetPoint(targetNode,nextNode){

        let worldPoint = this.localToWorldPoint(targetNode);
        let localPoint = this.worldToLocalPoint(worldPoint,nextNode);
        return localPoint;
    },

    setOriginToTargetPoint(targetNode,nextNode){
        let worldPoint = this.localToWorldPoint(targetNode);
        let localPoint = this.worldToLocalPoint(worldPoint,nextNode);
        targetNode.setParent(nextNode);
        targetNode.setPosition(localPoint);
    },

    setNodePosToOriginNodePos(targetNode,originNode){
        let worldPoint = this.localToWorldPoint(originNode);
        let localPoint = this.worldToLocalPoint(worldPoint,targetNode.parent);
        targetNode.setPosition(localPoint);
    },



};

module.exports = PointManager;