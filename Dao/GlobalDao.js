const db=require('../Util/db')
function SendError(error) {
    return new Promise((resolve,reject)=>{
        reject(error)
    })
}
function GetFormateTime()
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    return year+"-"+month+"-"+day+" "+hour+":"+minute;
}
function QueryFileByMd5(md5)
{
    return new Promise((resolve,reject) => {
        db.query('select * from files where md5=? ',[md5],(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result)
        });
    });
}
function AddFile(filemodel)
{
    return new Promise((resolve,reject)=>{
        db.QuickInsert('files',filemodel,(err,result)=>{
            if(result) resolve(result);
            else reject(err);
        });
    });
}
/**
 * 用于Promise嵌套情况时，跳出Promise
 * @type {function(*=): Promise<any>}
 */
exports.SendError=SendError;

exports.GetFormateTime=GetFormateTime;

exports.QueryFileByMd5=QueryFileByMd5;
exports.AddFile=AddFile;