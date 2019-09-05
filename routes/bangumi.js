const express=require('express');
const router = express.Router();
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
module.exports=router;
