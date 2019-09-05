var mysql=require('mysql');
var pool=mysql.createPool({
    host:"localhost",
    user:'root',
    password:'123321',
    database:'homevideo'
});
function query(sql,params,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,params,(err,rows)=>{
            callback(err,rows);
            connection.release();
        });
    });
}

function QuickInsert(table,params,callback){
    let cloumnsAndValues=GetCloumnsAndValues(params);
    let sql=`insert into ${table} (${cloumnsAndValues.cloumns}) values (${cloumnsAndValues.params})`;
    Insert(sql,cloumnsAndValues.values,callback);
}
function Insert(sql,params,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,params,
            (err,results)=> {
                callback(err,results.insertId);
                connection.release();
            });
    });
}
function QuickUpdate(table,params,keys,callback){
    let cloumnsAndValues=GetCloumnsAndValuesForUpdate(params,keys);
    let sql=`update ${table} set ${cloumnsAndValues.cloumns} where ${cloumnsAndValues.filter}`;
    Update(sql,cloumnsAndValues.values,callback);
}
function Update(sql,params,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,params,
            (err,results,fields)=> {
                callback(err,results.affectedRows);
                connection.release();
            });
    });
}
function GetCloumnsAndValues(data) {
    let cloumns='';
    let params='';
    let values=[];
    for(let i in data)
    {
        if(data[i]!=null)
        {
            params+="?,"
            cloumns+=`${i},`
            values.push(data[i]);
        }
    }
    params=params.substring(0,params.length-1);
    cloumns=cloumns.substring(0,cloumns.length-1);
    return {cloumns:cloumns,values:values,params:params};
}
function GetCloumnsAndValuesForUpdate(data,keys) {
    let cloumns='';
    let filter=''
    let values=[];
    for(let i in data)
    {
        if(data[i]!=null&&!keys.includes(i))
        {
            cloumns+=`${i}=?,`
            values.push(data[i]);
        }
    }
    for (let i=0,count=keys.length;i<count;i++)
    {
        filter+=`${keys[i]}=?,`
        values.push(data[keys[i]]);
    }
    filter=filter.substring(0,filter.length-1);
    cloumns=cloumns.substring(0,cloumns.length-1);
    return {cloumns:cloumns,values:values,filter:filter};
}
/*
 * 查找，更新，删除等操作
 * @param sql 全部使用占位符的sqlString,防止数据库注入
 * @param params 比如传入参数，[arg0,arg1,arg2]
 * @param callback err & list
 */
exports.query=query;
/**
 * 插入操作，带插入结果返回
 * @type {insert}
 */
/**
 * 传入对象，直接插入
 * @type {QuickInsert}
 */
exports.QuickInsert=QuickInsert;
/**
 * 传入对象和主键数组，更新对象中有赋值的条目
 * @type {QuickUpdate}
 */
exports.QuickUpdate=QuickUpdate;
