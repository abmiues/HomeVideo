const express=require('express');
const router = express.Router();
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
router.get('/bangumi',function (req,rsp,next) {
    rsp.render('PlayBangumi');
})
router.get('/bangumi/:id',function (req,rsp,next) {
    //rsp.render('PlayBangumi');
})
module.exports=router;
