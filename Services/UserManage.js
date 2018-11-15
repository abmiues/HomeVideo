const userDao=require('../Dao/UserDao');
function Login(account,pwd,callback) {
    console.log("dologin");
    userDao.QueryByAccount(account).then(result=>{
        if(result.pwd==pwd)
        {
            callback(null,result.uid);
        }
        else
        {
            callback('000');
        }
    }).catch(err=>{});
}
function Query(account) {
    
}
exports.Login=Login;