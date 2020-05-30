var _eventMap = []
function on (type, callback, target) {
    if (_eventMap[type] === undefined) {
        _eventMap[type] = [];
    }

    _eventMap[type].push({ callback: callback, target: target }); // 事件名为索引值

}

function emit (type, parameter)
{
    var array = _eventMap[type];  // 通过事件名type 检索到对应的事件
    if (array === undefined)
        return;
    for (var i = 0; i < array.length; i++)
    {
        var element = array[i];
        if (element)
        {
            if(element.target)
                element.callback.call(element.target, parameter);
            else
                element.callback.call(parameter);
        }
    }
}

function off(type, callback, target)
{
    var array = _eventMap[type];
    if (array === undefined)
        return;

    //window.GL.DBug.error("LENGHT = ", array.length, array)
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (element && element.callback === callback &&element.target === target) {
            array[i] = undefined;
            break;
        }
    }
}

function offType (type) {
    _eventMap[type] = undefined;
}


module.exports = {
    'on': on,// 设置事件监听
    'emit': emit,// emit事件，发送消息
    'off': off,// 清除一个事件
    'offType': offType,// emit事件，发送消息
}