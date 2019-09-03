function SendError(error) {
    return new Promise((resolve,reject)=>{
        reject(error)
    })
}

/**
 * 用于Promise嵌套情况时，跳出Promise
 * @type {function(*=): Promise<any>}
 */
exports.SendError=SendError;