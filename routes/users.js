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
        res.render('Login',{err:null});
})
router.get('/register',function (req,res,next) {
    res.render('register',{err:null});
})


router.post('/register',function (req,res,next) {
    let usersModel=new UsersModel;
    usersModel.time=userServices.GetTime();
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
