const userDao=require('../Dao/UserDao');
function Login(account,pwd,callback) {
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
exports.Login=Login;