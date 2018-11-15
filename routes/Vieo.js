const express=require('express');
const router = express.Router();
const fs=require('fs');
router.get('/video',function (req,res,next) {
    let videoId=req.query.id;
    let videotype='mp4';
    let videoPath='';
    res.writeHead(200,{'Content-Type':'video/'+videotype});
    let rs=fs.createReadStream(videoPath);
    rs.pipe(res);
    rs.on('end',function () {
        res.end();
        console.log("video send finish");
    })
})
