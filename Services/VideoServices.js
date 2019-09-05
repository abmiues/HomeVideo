const videoDao=require('../Dao/VideoDao');
const globalDao=require('../Dao/GlobalDao');
function addVideo(videmodel,callback) {
    videoDao.InsertVideo(videmodel).then((result)=>{
        callback(null,result);
    }).catch(err=>{
        callback(err);
    })
}