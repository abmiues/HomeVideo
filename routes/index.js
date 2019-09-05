const express = require('express');
const router = express.Router();
/* GET home page. */

//res.render 加载一个html，传入参数，不改变url地址
//res.redirect 地址重定向，直接访问一个地址，url变成访问地址
//res.json 发送json格式数据
//res.send 发送原始数据

//get 请求用req.query
//post 用req.body
//直接路径匹配 定义时需要用/:id,获取id值用req.params。例如127.0.0.1/bangumi/ep1112223,路径定义/bangumi/:id。
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/des', function(req, res, next) {
    req.session.destroy();
    res.send('des');
});
router.get('/search',function (req,rsp,next) {
    rsp.render('searchResult')
})
module.exports = router;
