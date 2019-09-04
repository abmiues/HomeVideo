var mysql=require('mysql');
var fs=require('fs');
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
function getTables(dbname)
{
   return new Promise((resolve,reject)=>{
        query("select table_name from information_schema.tables  where table_schema =?",[dbname],(error,rows)=>{
            if(error)
                reject(error);
            else
                resolve(rows);
        });
    });
}
function OutModelFile(dbname)
{
    getTables(dbname).then(tables=>{
        console.log(tables.length);
        for(let i=0,length=tables.length;i<length;i++)
        {
            console.log(tables[i].table_name);
            GetOneTableDetail(dbname,tables[i].table_name)
        }
    }).catch(error=>{
        console.log(error);
    });


}
function GetOneTableDetail(dbname,tablename) {
    query("select column_name, column_comment from information_schema.columns where table_schema =? and table_name = ? ",[dbname,tablename],
        (error,rows)=>{
            if(error)
                console.log(error);
            else
            {
               // console.log(rows);
                CreateFile(tablename,rows);
            }
        });
}
function CreateFile(tableName,rows)
{
    var fileName="";
    var namePart=tableName.split('_');
    namePart[0]=namePart[0].replace(namePart[0][0],namePart[0][0].toUpperCase());
    fileName+=namePart[0];
    if(namePart.length>1)
    {
        namePart[1]=namePart[1].replace(namePart[1][0],namePart[1][0].toUpperCase());
        fileName+=namePart[1];
    }
    fileName+="Model"
    var className=fileName;
    fileName+=".js";

    var content=`class ${className}{
    constructor() {}\n`
    for (let i=0,count=rows.length;i<count;i++)
    {
        let name=rows[i].column_name;
        let des=rows[i].column_comment;
        content+=`    #_${name};\n`
    }
    for (let i=0,count=rows.length;i<count;i++)
    {
        let name=rows[i].column_name;
        let des=rows[i].column_comment;
        content+=`    get ${name}(){
       return this.#_${name};
    }\n`
        content+=`    set ${name}(val){
       this.#_${name}=val;
    }\n`
    }
    content+='}\n'
    content+=`module.exports=${className};`
    console.log(content);
    fs.writeFile(`../model/${fileName}`, content, {'encoding ':'utf-8'}, function(err) {
        if (err) {
            throw err;
        }});
}
OutModelFile('homevideo');
