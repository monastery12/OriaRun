/**
 * Created by ShawnZhang on 2017/9/3.
 */

/**
 * 通过资源实例化预制对象
 * @param res   资源字符串
 * @param cb    回调函数返回
 */
cc.createPrefab = function(res, cb) {
    cc.loader.loadRes(res, cc.Prefab, (error, prefab) => {
        let node = null;
        if (error) {
            cc.error(`createPrefab ${error}`);
        } else {
            node = cc.instantiate(prefab);
        }
        
        if (cb) {
            cb(error, node);
        }
    });  
}

/**
 * 通过资源路径（预制）创建节点, 根据 sender 类型并完成节点挂接
 * @param sender
 * @param res
 * @param cb
 */
cc.Component.prototype.createNode = function(sender, res, cb) {
    cc.log(`createNode ${res}`);
    cc.createPrefab(res, (error, node) => {
        if (sender instanceof cc.Node) {
            sender.addChild(node);
        } else if (this.node && this.node instanceof cc.Node) {
            this.node.addChild(node, 0);
        }
        
        if (cb) {
            cb(node);
        }
    });
};

/**
 * 删除组件上的节点
 */
cc.Component.prototype.destroyNode = function() {
    if (!this.node) {
        return;
    }
    this.node.destroy();
};

/**
 * 节点上是否存在某些组件
 */
cc.Node.prototype.hasComponent = function (types) {
    if (!Array.isArray(types)) {
        types = [types];
    }2
    let component = types.find(type => this.getComponent(type));
    return !!component;
};

/**
 * 获取精灵上的纹理文件名
 * @returns {*}
 */
cc.Sprite.prototype.getTextureFilename = function() {
    if (this.spriteFrame) {
        let fileName = this.spriteFrame._textureFilename;
        const index = fileName.indexOf('resources/');
        return fileName.substr(index + 10);
    }
    return '';
};

/**
 * 获取图集中的 spriteFrame， 图集需要预先加载
 * @param atlas
 * @param key
 * @returns {*}
 */
cc.getSpriteFrameByAtlas = function getFrameByAtlas(atlas, key) {
    let path = cc.path.mainFileName(atlas);
    let spriteAtlas = cc.loader.getRes(path, cc.SpriteAtlas);
    if (spriteAtlas) {
        return spriteAtlas.getSpriteFrame(key);
    }
    return null;
};

cc.createNodeComponent = function (componentType) {
    let node = new cc.Node();
    let component = node.addComponent(componentType);
    return component;
};

cc.setEnumAttr = function(obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
};


cc.addNodeToParent = function(node, parent){
    var noderealwith = node.scaleX * node.width
    var noderealheight = node.scaleY * node.height
    var noderealScaleX = parent.width / noderealwith
    var noderealScaleY = parent.height / noderealheight
    node.scaleX = noderealScaleX
    node.scaleY = noderealScaleY
    node.parent = parent

    cc.log("请自己根据锚点计算位置")
}
// 重写 cc.error 
var errlog = cc.error
cc.error = function(){
    //屏蔽此处 err log 即可正常打印
    if(!CC_WECHATGAME)
    {
        return
    }
    errlog.apply(null, arguments)  
}


//begin==========================================================================音乐音效相关
var PLAYMUSICTYPE = {
    PLAY:1,
    NONE:0,
    NO_PLAY:2
}
 
var _playMusic = cc.audioEngine.playMusic
var _playEffect = cc.audioEngine.playEffect

var curmusic = null,currmusicloop=null;

cc.audioEngine.isPlayMusic = function(){
    return cc.sys.localStorage.getItem("m_isPlayMusic") == PLAYMUSICTYPE.PLAY
}

cc.audioEngine.isPlayEffect = function(){
    return cc.sys.localStorage.getItem("m_isPlayEffect") == PLAYMUSICTYPE.PLAY
}

//重写接口
cc.audioEngine.playMusic = function(url, loop, musicVolume){
    curmusic = url;
    currmusicloop = loop;
    if(cc.audioEngine.isPlayMusic()){
        _playMusic.call(cc.audioEngine,url, currmusicloop, musicVolume)
    }
}

cc.audioEngine.playEffect = function(url, loop, musicVolume){
    if(cc.audioEngine.isPlayEffect()){
        _playEffect.call(cc.audioEngine, url, loop, musicVolume)
    }
}
//重写stop 函数 停止音乐 停止了所有的音效
var _stopAllEffects = cc.audioEngine.stopAllEffects
//重写stop 函数
cc.audioEngine.stopAllEffects = function(){
    var musicId = null;
    if(this._music){
        musicId = this._music.id;
    }
    for (var id in this._id2audio) {
        var audio = this._id2audio[id];
        if (!audio || audio.id === musicId) {
            continue
        }
        var state = audio.getState();
        if (state === cc.audioEngine.AudioState.PLAYING) {
            audio.stop();
        }
    }
}

cc.audioEngine.replayCurrMusic = function(){
    if (curmusic){
        cc.audioEngine.playMusic(curmusic, currmusicloop)
    }
}
cc.audioEngine.setMusicOpen = function(ismuiscopen){
    cc.sys.localStorage.setItem("m_isPlayMusic", ismuiscopen ? PLAYMUSICTYPE.PLAY : PLAYMUSICTYPE.NO_PLAY)
    if(ismuiscopen){
        //该接口 需要重新播放背景音乐
        cc.audioEngine.replayCurrMusic() 
    }else{
        cc.audioEngine.stopMusic()
    }
}
/**
 * 设置音乐音效开关 音乐开关 音效开关
 */
cc.audioEngine.setEffectOpen = function(iseffectopen){
    cc.sys.localStorage.setItem("m_isPlayEffect", iseffectopen ? PLAYMUSICTYPE.PLAY : PLAYMUSICTYPE.NO_PLAY)
    if(!iseffectopen){
        cc.audioEngine.stopAllEffects()
    }
}

if(!cc.sys.localStorage.getItem("m_isPlayMusic")){
    cc.audioEngine.setMusicOpen(PLAYMUSICTYPE.PLAY) 
}

if(!cc.sys.localStorage.getItem("m_isPlayEffect")){
    cc.audioEngine.setEffectOpen(PLAYMUSICTYPE.PLAY) 
}


//end==========================================================================音乐音效开关结束

