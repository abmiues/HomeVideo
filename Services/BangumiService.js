const bangumiDao=require('../Dao/BangumiDao');
const globalDao=require('../Dao/GlobalDao')

function AddBangumi(bangumiModel,callback)
{
    bangumiDao.InsertBangumi(bangumiModel)
        .then(result=>{callback(null,result);})
        .catch(err=>{callback(err);});
}
exports.AddBangumi=AddBangumi;
exports.GetTime=globalDao.GetFormateTime;