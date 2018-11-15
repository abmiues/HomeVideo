const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Login',function (req,res,next) {
  let account;
  let uid;
  let pwd;
    if(req.session.account==account)//如果session里有记录
    {
        res.json({r:1,account:account})
        uid=req.session.uid;
        pwd=req.session.pwd;
    }
    else
    {
         uid=req.query.uid;
         pwd=req.query.pwd;
        req.session.uid=uid;
        req.session.pwd=pwd;
        res.send("login")
    }
  console.log("user login:"+uid);
})
router.get('/des', function(req, res, next) {
    req.session.destroy();
    res.send('des');
});
module.exports = router;
