const express = require('express');
const progress=require('progress-stream');
const multer = require('multer');
const router = express.Router();
const UPLOAD_FOLDER='./public/cover';
const UPLOAD_TMP_FOLDER='./public/cover_tmp';
const globalService=require('../Services/GlobalService')
const fs=require('fs');
const FileModel=require('../model/FilesModel')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_TMP_FOLDER)
    },
    filename: function (req, file, cb) {
        req.filename=req.body.md5+req.body.ext;
        cb(null,req.filename)
    }
})
//先执行筛选，再执行重命名
const upload = multer({ storage: storage,
    fileFilter: function(req, file, cb){
        globalService.GetFileByMd5AndSize(req.body.md5,req.body.size,(err,data)=>{
            if(err)
                cb(null,false);//如果出错了，不上传
            else
                cb(null,data==null);//如果是未上传的文件，保存下
        });
    }
});
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
router.post('/upcover',function (req,rsp,next) {
    let p = progress({time:1000,length:req.headers['content-length']})//1秒刷新一次，从请求头中获取长度
    let upload1 = upload.single('cover')//定义单文件，接收到后以cover存储
    req.pipe(p)
    p.headers = req.headers
    p.on('progress', function (progress) {
        console.log(progress.percentage);
    })
    upload1(p, rsp, function (err) {
        if(err)//如果出错了，删除临时文件
        {
            if(err=='userCancel')
                deletTmpFile(p)
            else
                rsp.json({err:err})
            return
        }
        let oldPath=UPLOAD_TMP_FOLDER+'/'+p.filename;
        let newPath=UPLOAD_FOLDER+'/'+p.filename;
        let realPath;
        fs.rename(oldPath,newPath,function(error){
            if(error)
            {
                realPath=oldPath;
                console.log("移动文件夹失败："+p.filename+" "+error);
            }
            else
                realPath=newPath;
            let fileModel=new FileModel();
            fileModel.ext=p.body.ext;
            fileModel.filename=p.body.name;
            fileModel.filesize=p.body.size;
            fileModel.md5=p.body.md5;
            fileModel.path=realPath;
            fileModel.time=globalService.GetTime();
            globalService.AddFile(fileModel,(err,result)=>{
                if(err)
                {
                    rsp.json({err:"文件已上传，添加记录失败"})
                }
                else
                    rsp.json({data:realPath})
            })
        })
    })
    req.on('aborted',()=>{
        if(p.filename)//用户取消上传，需要清理文件
        {
            p.emit('uploadAbord','userCancel');
        }
        console.log('req aborted');
    })
})
function deletTmpFile(p)
{
    fs.unlink(UPLOAD_TMP_FOLDER+'/'+p.filename,(err)=>{
        if(err)
        {
            console.log('删除临时文件失败：'+p.filename+' '+err);
            return
        }
        console.log('用户取消上传，删除临时文件成功:'+p.filename);
    });
}
module.exports = router;
