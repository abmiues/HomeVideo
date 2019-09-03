const express = require('express');
const router = express.Router();
const userManage=require('../Services/UserManage');
const UserModel=require('../model/UserModel');
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
            res.render('Login',{err:1});
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
        res.redirect('/');
    else
        res.render('Login',{err:0});
})
router.get('/register',function (req,res,next) {
    res.render('register',{err:null});
})


router.post('/register',function (req,res,next) {

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    let userModel=new UserModel;
    userModel.time=year+"-"+month+"-"+day+" "+hour+"-"+minute;
    userModel.icon="";
    userModel.account=req.body.account;
    userModel.pwd=req.body.pwd;
    userModel.name=req.body.name;
    userManage.Register(userModel,(err,data)=>{
      if(err)
        res.render('register',{err:err});
      else
          res.redirect('Login');
    })
})
module.exports = router;
