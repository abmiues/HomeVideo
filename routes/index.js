const express = require('express');
const router = express.Router();
const userManage=require('../Services/UserManage');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Login',function (req,res,next) {
    let account=req.query.account;
    let pwd=req.query.pwd;
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
          req.session.pwd=pwd;
        }
    })
  console.log("user login:"+account);
})
router.get('/des', function(req, res, next) {
    req.session.destroy();
    res.send('des');
});
module.exports = router;
