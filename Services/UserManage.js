const userDao=require('../Dao/UserDao');
const globalDao=require('../Dao/GlobalDao');
function Login(account,pwd,callback) {
    userDao.QueryByAccount(account)
        .then((result)=>{
            if(result.pwd==pwd)
                callback(null,result.uid);
            else
                callback('账号或密码错误');
            })
        .catch(err=>{callback("服务器错误");});
}
function Register(oneuUser,callback)
{
    userDao.QueryByAccount(oneuUser.account)
        .then((result)=>{
            if(result)
                return globalDao.SendError("账号已存在")
            else
                return userDao.InsertUser(oneuUser);
        })
        .then(result=>{callback(null,result);})
        .catch(err=>{callback(err)});
}
exports.Login=Login;
exports.Register=Register;