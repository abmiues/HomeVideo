const db=require('../Util/db')
function InsertVideo(videoModel) {
    return new Promise((resolve ,reject)=> {
        db.insert('video',videoModel,
            (err,result)=>{
            if(err) reject(err);
            else resolve(result.insertId);
            })
    });
}
exports.InsertVideo=InsertVideo;
