const userDao=require('../Dao/UserDao');
const globalDao=require('../Dao/GlobalDao');
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
function Register(oneuser,callback)
{
    userDao.QueryByAccount(oneuser.account)
        .then(result=>{
            if(result)
               return globalDao.SendError("账号已存在")
            else
                return userDao.InsertUser(oneuser);
        })
        .then(result=>{
        callback(null,result);
    }).catch(err=>{callback(err)});
}
exports.Login=Login;
exports.Register=Register;