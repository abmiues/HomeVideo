const express = require('express');
const router = express.Router();
const userServices=require('../Services/UserServices');
const UsersModel=require('../model/UsersModel');
router.post('/Login',function (req,res,next) {
    let account=req.body.account;
    let pwd=req.body.pwd;
    //let keepLogin=req.body.keepLogin;
    userServices.Login(account,pwd,(err,data)=>{
        if(err)
        {
            req.session.destroy(err=>{
                console.log("session destroy succeed account:"+account);
            });
            res.render('Login',{err:err});
        }
        else
        {
            req.session.account=account;
            req.session.uid=data;
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
    let usersModel=new UsersModel;
    usersModel.time=year+"-"+month+"-"+day+" "+hour+":"+minute;
    usersModel.icon="";
    usersModel.account=req.body.account;
    usersModel.pwd=req.body.pwd;
    usersModel.name=req.body.name;
    userServices.Register(usersModel,(err,data)=>{
      if(err)
        res.render('register',{err:err});
      else{
          console.log(data);
          res.redirect('Login')
      };
    })
})
module.exports = router;
