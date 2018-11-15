const db=require('../Util/db.js')
function QueryByAccount(account) {
    return new Promise((resolve, reject) =>{
        db.query("select * from users where account=?",[])
        db
    } )
}