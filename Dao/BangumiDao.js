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
exports.InsertBangumi=InsertBangumi;
