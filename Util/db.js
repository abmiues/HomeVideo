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

function insert(table,params,callback){
    let cloumnsAndValues=GetCloumnsAndValues(params);
    let sql=`insert into ${table} (${cloumnsAndValues.cloumns}) values (${cloumnsAndValues.params})`;
    pool.getConnection(function (err,connection) {
        connection.query(sql,cloumnsAndValues.values,
            (err,results,fields)=> {
            callback(err,results);
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
exports.insert=insert;
/**
 * 用于把对象转换成sql的列名和数值，方便插入操作
 * @type {function(*): {cloumns: string, values: Array, params: string}}
 */
exports.GetCloumnsAndValues=GetCloumnsAndValues;