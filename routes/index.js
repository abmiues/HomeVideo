const express = require('express');
const progress=require('progress-stream');
const multer = require('multer');
const router = express.Router();
const UPLOAD_FOLDER='./public/cover';
const UPLOAD_TMP_FOLDER='./public/cover_tmp';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_TMP_FOLDER)
    },
   /* filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }*/
})
const upload = multer({ storage: storage });
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
var i=0;
router.post('/upcover',function (req,rsp,next) {
    let p = progress({time:1000,length:req.headers['content-length']})//1秒刷新一次，从请求头中获取长度
    let upload1 = upload.single('cover')//定义单文件，接收到后以cover存储
    req.pipe(p)
    p.headers = req.headers
    p.on('progress', function (progress) {
        console.log(progress.percentage);
    })
    upload1(p, rsp, function () {
        console.log("finish");
        let file=p.file;
        let body=p.body;
        rsp.json({data:body.name})
    })
})
module.exports = router;
