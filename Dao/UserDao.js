const db=require('../Util/db')

function QueryByAccount(account) {
    return new Promise((resolve, reject) =>{
        db.query("select * from users where account=?",[account],function(err,data){
            if(err)
                reject(err);
            else resolve(data[0]);
        })
    } )
}
function QueryByUid(uid) {
    return new Promise((resolve, reject) =>{
        db.query("select * from users where uid=?",[uid],(err,data)=>{
            if(err)
                reject(err);
            else resolve(data);
        })
    } )
}
function InsertUser(userInfo)
{
    return new Promise((resolve, reject) =>{
        db.insert("insert into users (account,pwd,name,time,icon) values(?,?,?,?,?)",
            [userInfo.account,userInfo.pwd,userInfo.name,userInfo.time,userInfo.icon],
            (err,data)=>{
            if(err) reject(err);
            else resolve(data);
        })
    } )
}
exports.QueryByUid=QueryByUid;
exports.QueryByAccount=QueryByAccount;
exports.InsertUser=InsertUser;