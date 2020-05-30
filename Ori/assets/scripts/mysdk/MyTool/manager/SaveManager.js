/**
 * 存档obj = this.saveData
 * obj.version      版本号
 * obj.playerData   玩家存档
 *
 */

var encrypt = require("encryptjs")

const ENCRYPT = false;                                  //是否加密
const SECRET_KEY = "xiaoshuai";                         //密钥

const GAME_DATA = "GAME_DATA_ONE_LINE";

var SaveManager = {

    saveData: null,

    readNetData : null,
    readStorageData : null,

    saveTime: null,

    syncCount: 0,

    server_force_change : false,
    _saveSure:true,

    init() {

        //监听游戏状态
        cc.game.on(cc.game.EVENT_HIDE, function () {    //游戏从运行切换到暂停状态,保存数据
            this.onGameHide();
        }, this);

        this.readGameDataFromStorge();          //本地数据
        this.readGameDataFromServer();          //在线数据
        this.readGameData();                    //读取存档

        this.autoSaveStart();                           //自动保存
    },

    //写到缓存，sync为true时发送到服务器
    save() {
        this.writeGameData();
        this.writeGameDataToStrage();
        this.writeGameDataToServer();
    },

    //自动保持
    autoSaveStart() {
        this.asIrl = setInterval(this.autoSave.bind(this), 5000);
    },

    //隐藏保存
    onGameHide() {
        this.save();
    },

    //自动保存
    autoSave() {
        this.save();
    },

    //数据版本号
    writeVersion(obj) {
        obj.version = window.GL.Conf.version;
    },

    //写所有的数据到緩存
    writeGameData() {
        this.saveData = {};
        this.writeVersion(this.saveData);                           //数据版号
        window.GL.PlayerManager.saveLastTime();
        this.saveData.playerData = window.GL.PlayerManager._data;          //数据玩家存档

    },

    //读数据
    readGameData() {

        var useData = null;
        if( this.readStorageData ){
            useData = this.readStorageData;
        }
        else if(this.readNetData){
            useData = this.readNetData;
        }


        if (!useData) {
            useData = null;
            //通知数据读取完

            window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
            return ;
        }

        //读取玩家数据
        if(useData.playerData){
            if(this._saveSure){
                window.GL.PlayerManager._data = useData.playerData;
                window.GL.PlayerManager.freshTime();
                //-------------------------------------------
            }
        }

        //读取版本号
        if(useData.version){
            window.GL.Conf.version = useData.version;
        }


        this.saveData = useData;                //

        //通知数据读取完毕
        window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
    },

    //写入所有的数据到Storge
    writeGameDataToStrage: function () {


        let storgeObj = this.saveData;

        if(ENCRYPT){
            //加密，保存加密文
            let content =  encrypt.encrypt(JSON.stringify( storgeObj),SECRET_KEY,256)
            cc.sys.localStorage.setItem(GAME_DATA,content );

        }else {
            cc.sys.localStorage.setItem(GAME_DATA,JSON.stringify( storgeObj) );
        }

    },

    //向服务器发送全部的数据 写数据到服务器
    writeGameDataToServer: function () {
        //window.GL.HttpMgr.sendPlayerDataHttp();
    },

    //读取所有数据从Storge
    readGameDataFromStorge: function () {

        //改为同步读取
        try {
            var data = cc.sys.localStorage.getItem(GAME_DATA);

            if(ENCRYPT){
                this.readStorageData = JSON.parse( encrypt.decrypt(data,SECRET_KEY,256) );                //解密
            }else{
                this.readStorageData = JSON.parse(data);
            }


        } catch (error) {

            this.readStorageData = null;
        }
    },

    //读取数据从服务器
    readGameDataFromServer: function (msg) {
        this.readNetData = null;

        // window.GL.HttpMgr.sendHttpRequest("logincheck", senddata, function (resp, status) {
        //     if(httpRequest)
        //     {
        //         return;
        //     }
        //     httpRequest = true;
        //
        //     if (status >= 200)
        //     {
        //         try
        //         {
        //             let playerdata = JSON.parse(resp);
        //             if (playerdata)
        //             {
        //                 switch (playerdata.errcode)
        //                 {
        //                     case 0:
        //                     {
        //                         // 1.保存微信userid
        //
        //                         //网络数据
        //                         //playerdata.list.data
        //                         break
        //                     }
        //                     default:
        //                     {
        //                         setTimeout(() =>
        //                         {
        //                             //登陆超时
        //                         }, 2000)
        //                     }
        //                 }
        //             }
        //         }
        //         catch (e)
        //         {
        //
        //             setTimeout(() =>
        //             {
        //                 //登陆出错
        //             }, 2000)
        //         }
        //     }
        //     else
        //     {
        //         setTimeout(() =>
        //         {
        //             //网络出错
        //         }, 2000)
        //     }
        // });
    },

    btnClose(){
        this.node.active = false;
    },

};

module.exports = SaveManager;
