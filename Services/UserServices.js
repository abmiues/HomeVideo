const userDao=require('../Dao/UserDao');
const globalDao=require('../Dao/GlobalDao');
function Login(account,pwd,callback) {
    userDao.QueryByAccount(account)
        .then((result)=>{
            if(result){
                if(result.pwd==pwd)
                    callback(null,result.uid);
                else
                    callback('账号或密码错误');
            }
            else
                callback('账号不存在');
            })
        .catch(err=>{callback(err);});
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
exports.GetTime=globalDao.GetFormateTime;