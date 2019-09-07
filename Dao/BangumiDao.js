const db=require('../Util/db')
function InsertBangumi(bangumiModel) {
    return new Promise((resolve ,reject)=> {
        db.QuickInsert('bangumi',bangumiModel,
            (err,result)=>{
            if(err) reject(err);
            else resolve(result);
            })
    });
}
function GetBangumiGroup()
{
    return new Promise((resolve,reject) => {
        db.query('select * from bangumi_group',null,(err,result)=>{
            if(result) resolve(result);
            else reject(err);
        })
    })
}
function InsertBangumiGroup(bangumiGroup) {
    return new Promise((resolve ,reject)=> {
        db.QuickInsert('bangumi_group',bangumiGroup,
            (err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
    });
}
exports.InsertBangumi=InsertBangumi;
exports.GetBangumiGroup=GetBangumiGroup;
exports.InsertBangumiGroup=InsertBangumiGroup;
