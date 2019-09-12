const globalDao=require('../Dao/GlobalDao');
function GetFileByMd5AndSize(md5,size,callback) {
    let fileInfo=null;
    globalDao.QueryFileByMd5(md5).then((result)=>{
        if(result.length>0)
        {
            for (let i=0,count=result.length;i<count;i++)
            {
                if(result[i].filesize==size)
                {
                    fileInfo=result[i];break;
                }
            }
        }
        callback(null,fileInfo)
    }).catch((err)=>{
        console.log('文件查询错误')
        callback(err)
    })
}
function AddFile(fileModel,callback)
{
    globalDao.AddFile(fileModel).then((result)=>{
        callback(null,result);
    }).catch(err=>{
        callback(err);
    })
}
exports.GetFileByMd5AndSize=GetFileByMd5AndSize;
exports.AddFile=AddFile;
exports.GetTime=globalDao.GetFormateTime;