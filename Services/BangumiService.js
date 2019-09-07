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
function AddBangumiGroup(bangumiGroup,callback)
{
    bangumiDao.InsertBangumiGroup(bangumiGroup)
        .then(result=>callback(null,result))
        .catch(err=>callback(err));
}
exports.AddBangumi=AddBangumi;
exports.GetBangumiGroup=GetBangumiGroup;
exports.AddBangumiGroup=AddBangumiGroup;
exports.GetTime=globalDao.GetFormateTime;