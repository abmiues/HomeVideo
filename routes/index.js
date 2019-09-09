const express = require('express');
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
//const upload = multer({ dest: UPLOAD_TMP_FOLDER })
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
router.post('/upcover',upload.single('cover'),function (req,rsp,next) {
    let file=req.file;
    let body=req.body;
    rsp.json({data:body.name})

})
module.exports = router;
