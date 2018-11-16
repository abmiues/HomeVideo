const express = require('express');
const router = express.Router();
const userManage=require('../Services/UserManage');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Login',function (req,res,next) {
    let account=req.body.account;
    let pwd=req.body.pwd;
    userManage.Login(account,pwd,(err,data)=>{
        if(err)
        {
            res.json({r:err});
            req.session.destroy(err=>{
                console.log("session destroy fail account:"+account);
            });
    }
        else
        {
            res.json({r:1,data});
            req.session.account=account;
            req.session.uid=data;
        }
    })
    console.log(req.body);
})

router.get('/Login',function (req,res,next) {
    console.log("do");
   res.render('Login');
})
router.get('/register',function (req,res,next) {

})
router.get('/des', function(req, res, next) {
    req.session.destroy();
    res.send('des');
});
module.exports = router;
