const express = require('express');
const router = express.Router();
const userManage=require('../Services/UserManage');
/* GET home page. */

//res.render 加载一个html，传入参数，不改变url地址
//res.redirect 地址重定向，直接访问一个地址，url变成访问地址
//res.json 发送json格式数据
//res.send 发送原始数据
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Login',function (req,res,next) {
    let account=req.body.account;
    let pwd=req.body.pwd;
    let keepLogin=req.body.keepLogin;
    userManage.Login(account,pwd,(err,data)=>{
        if(err)
        {
           // res.json({r:err});
            req.session.destroy(err=>{
                console.log("session destroy succeed account:"+account);
            });
            res.render('Login',{err:0});
        }
        else
        {
            if(keepLogin)
            {
                console.log(keepLogin);
                req.session.account=account;
                req.session.uid=data;
            }
            res.redirect('/');
        }
    })
    console.log(req.body);
})

router.get('/Login',function (req,res,next) {
    if(req.session.uid)
    {
        res.redirect('/');
    }
    else
    res.render('Login',{err:1});
})
router.get('/register',function (req,res,next) {

})
router.get('/des', function(req, res, next) {
    req.session.destroy();
    res.send('des');
});
module.exports = router;
