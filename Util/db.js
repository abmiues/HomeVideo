var mysql=require('mysql');
var pool=mysql.createPool({
    host:"localhost",
    user:'root',
    password:'123321',
    database:'homevideo'
});
function query(sql,params,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,params,function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

function insert(sql,params,callback)
{
    pool.getConnection(function (err,connection) {
        connection.query(sql,params,function (err,results,fields) {
            callback(err,results);
            connection.release();
        });
    });
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
 * @param sql 全部使用占位符的sqlString,防止数据库注入
 * @param params 比如传入参数，[arg0,arg1,arg2]
 * @param callback err & int
 */
exports.insert=insert;