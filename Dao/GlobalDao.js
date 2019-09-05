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
/**
 * 用于Promise嵌套情况时，跳出Promise
 * @type {function(*=): Promise<any>}
 */
exports.SendError=SendError;

exports.GetFormateTime=GetFormateTime;