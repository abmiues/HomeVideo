function SendError(error) {
    return new Promise((resolve,reject)=>{
        reject(error)
    })
}
exports.SendError=SendError;