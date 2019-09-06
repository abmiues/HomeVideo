const bangumiDao=require('../Dao/BangumiDao');
const globalDao=require('../Dao/GlobalDao')

function AddBangumi(bangumiModel,callback)
{
    bangumiDao.InsertBangumi(bangumiModel)
        .then(result=>{callback(null,result);})
        .catch(err=>{callback(err);});
}
function GetBangumiGroup(callback)
{
    bangumiDao.GetBangumiGroup()
        .then(result=>callback(null,result))
        .catch(err=>callback(err));
}
exports.AddBangumi=AddBangumi;
exports.GetBangumiGroup=GetBangumiGroup;
exports.GetTime=globalDao.GetFormateTime;