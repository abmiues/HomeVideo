const express=require('express');
const router = express.Router();
const BangumiModel=require('../model/BangumiModel');
const BangumiGroupModel=require('../model/BangumiGroupModel');
const BangumiVideoModel=require('../model/BangumiVideoModel');
const bangumiServices=require('../Services/BangumiService');
/*router.post('/videos',function (req,res,next) {
    let videoId=req.body.id;
    let videotype='mp4';
    let videoPath='';
    res.writeHead(200,{'Content-Type':'video/'+videotype});
    let rs=fs.createReadStream(videoPath);
    rs.pipe(res);
    rs.on('end',function () {
        res.end();
        console.log("video send finish");
    })
})*/
router.get('/',function (req,res,next) {
    res.render('videoList',{title:'动画'})
})
router.get('/play',function (req,rsp,next) {
    rsp.redirect('/bangumi/play/0');
})
router.get('/play/:id',function (req,rsp,next) {
    rsp.render('PlayBangumi',{id:req.params['id']});
})
router.post('/getbangumigroup',function (req,rsp,next) {
    bangumiServices.GetBangumiGroup((err,result)=>{
        if(err) rsp.json({err:err});
        else rsp.json({err:null,result:result});
    })
})
router.get('/addbangumi',function (req,rsp,next) {
  rsp.render('AddBangumi',{msg:null,data:null});
})
router.post('/addbangumi',function (req,rsp,next) {
    let bangumiModel=new BangumiModel();
    bangumiModel.name=req.body.title;
    bangumiModel.cover=req.body.cover;
    bangumiModel.des=req.body.des;
    bangumiModel.time=req.body.time;
    bangumiModel.group=req.body.group;
    bangumiModel.part=req.body.part;
    bangumiServices.AddBangumi(bangumiModel,(err,result)=>{
        if(result)
            rsp.render('AddBangumi',{msg:"添加成功"});
        else
            rsp.render('AddBangumi',{msg:err,data:null});
    })
})
router.post('/addbangumigroup',function (req,rsp,next) {
    let bangumiModel=new BangumiModel();
    bangumiModel.name=req.body.title;
    bangumiModel.cover=req.body.cover;
    bangumiModel.des=req.body.des;
    bangumiModel.time=req.body.time;
    console.log(bangumiModel)
   // rsp.render('AddBangumi',{msg:null,data:null});
    rsp.redirect('addbangumi');
})
module.exports=router;
