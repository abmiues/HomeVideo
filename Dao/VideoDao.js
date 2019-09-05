const db=require('../Util/db')
function InsertVideo(videoModel) {
    return new Promise((resolve ,reject)=> {
        db.QuickInsert('video',videoModel,
            (err,result)=>{
            if(err) reject(err);
            else resolve(result);
            })
    });
}
exports.InsertVideo=InsertVideo;
