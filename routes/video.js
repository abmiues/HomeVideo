const express=require('express');
const router = express.Router();
const VideoModel=require('../model/VideoModel');
const videoServices=require('../Services/VideoServices');
const fs=require('fs');
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
/*router.get('/:id', function(req, res, next) {
    let big=req.params.big;
    res.send(big);
});*/
router.get('/',function (req,res,next) {
    res.render('PlayVideo')
})
router.get('/addvideo',function (req,res,next) {
   // if(req.session.uid)
        res.render('AddVideo',{msg:null});
   // else
     //   res.redirect('/users/Login');
})
router.post('/addvideo',function (req,res,next) {
   // if(req.session.uid)
  //  {
        let videoModel=new VideoModel();
        videoModel.name=req.body.title;
        videoModel.uid=0;//req.session.uid;
        videoModel.addtime=videoServices.GetTime();
        videoModel.cover=req.body.cover;
        videoModel.des=req.body.des;
        videoModel.path=req.body.path;
        //videoModel.belong=req.body.belong;
        //videoModel.part=req.body.part;
        videoServices.addVideo(videoModel,(err,result)=>{
            if(result)
                res.render('AddVideo',{msg:"添加成功"});
            else
                res.render('AddVideo',{msg:err});
        });

   // }
  //  else
   //     res.redirect('/users/Login');

})
module.exports=router;
