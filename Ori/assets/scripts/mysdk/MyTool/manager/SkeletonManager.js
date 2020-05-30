/**
 * spine动画管理
 * @type {{}}
 */

var SkeletonManager = {

    //获取spine动画拥有动画名字
    getAnimalsNameBySkeleton( skeleton ){

        if( !skeleton.skeletonData ) return ;
        let animalsArr = skeleton.skeletonData._skeletonCache.animations;

        /**
         *  animalsArr[i] 数据结构
         *  duration: 1.333299994468689
         *  name: "idle"
         */

        let animalsNameArr = [];

        for(let i = 0 ; i < animalsArr.length ; i++ ){
            animalsNameArr.push(animalsArr[i].name);
        }

        return animalsNameArr;

    },

    //获取spine某个动画的时间长度
    getAnimalDurationByAnimation(skeleton,animationName){
        if( !skeleton.skeletonData ) return ;
        let animalsArr = skeleton.skeletonData._skeletonCache.animations;
        for(let i = 0 ; i < animalsArr.length ; i++ ){
            if(animalsArr[i].name == animationName){
                return animalsArr[i].duration;
            }
        }
    },

    //播放spine指定的一个动画
    playAnimationByName(skeleton,animationName){
        skeleton.setAnimation( 1,animationName[1],true );
    },

    loadSpine(skeletonNode,skelotonPath){
        cc.loader.loadRes( skelotonPath, sp.SkeletonData, this.onProcess.bind(this), function (err,res) {
            if (err) {
                cc.error(err);
                return ;
            }

            let spine = skeletonNode.getComponent('sp.Skeleton');
            spine.skeletonData = res;

            //let animate = spine.setAnimation(0, 'run', true);

        }.bind(this) );
    },

    onProcess (completeCount, totalCount, item) {},



};

module.exports = SkeletonManager