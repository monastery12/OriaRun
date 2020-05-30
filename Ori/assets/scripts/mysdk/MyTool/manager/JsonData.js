
var JsonData = {

    jsonArray:['basedata','cupbase'],                                   //json表
    jsonData:{},

    /**
     * 读取存档方法1
     */
    readJsonData:function () {
        for( let i = 0 ; i < this.jsonArray.length ; i++ ){
            cc.loader.loadRes(`config/${this.jsonArray[i]}` , function (err,res) {
                if(!err){
                    let dataName = this.jsonArray[i];
                    this.jsonData[dataName] = res.json;
                }
            }.bind(this));
        }

    },


    //读取存档方法2
    readJsonDataFromDir:function(){
        cc.loader.loadResDir('config', function (err, res) {
            if (!err) {
                for(let i = 0 ; i < res.length ; i++ ){
                    let dataName = res[i].name;
                    this.jsonData[dataName] = res[i].json;

                }
                window.GL.GLFunc.gLog(`配置表数据${this.jsonData}`);
                window.GL.MessageCenter.emit(window.GL.EventDef._msg_load_assest);
            }
        }.bind(this))


    },



//
}

module.exports = JsonData
