const titbit = require('titbit');
const xmlparse = require('xml2js').parseString;
const wxmsg = require('./msghandle');

var app = new titbit();

app.router.post('/wx/msg',async c=>{
    try{
        let data = await new Promise((rv,rj)=>{
            xmlparse(c.body,{explicitArray:false},
                (err,result)=>{
                    if(err){rj(err);}
                else{rv(result.xml);} 
               });
        });
        let retmsg={
            touser:data.FromUserName,
            fromuser:data.ToUserName,
            msgtype:'',
            msgtime:parseInt(Data.now()/1000),
            msg:''
        };
        c.res.body = wxmsg.msgDispatch(data,retmsg)
    }catch(err){
        console.log(err);
    }
})

