const formatMsg = require('./fmtwxmsg');

function help(){
    return '你好，这是一个测试号，目前会原样返回用户输入的消息，暂不支持识别类型';
}

function userMsg(wxmsg,retmsg){
    if(wxmsg.MsgType == 'text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg = help();
                retmsg.msgtype='text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype='text';
                retmsg.msg='草泥马';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype='text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);
        }
    }
    switch(wxmsg.MsgType){
        case 'image':
        case 'vioce':
            retmsg.msgtype=wxmsg.MsgType;
            retmsg.msg=wxmsg.MediaID;
            return formatMsg(retmsg);
        default:
            return formatMsg(retmsg);
    }
}
exports.help=help;
exports.userMsg=userMsg;

exports.msgDispatch=function(wxmsg,require){
    return userMsg(wxmsg,retmsg);
};
