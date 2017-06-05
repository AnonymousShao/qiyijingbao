const http = require('axios')
const des = require('../globals/crypt')
const host = require('./config').host

module.exports.sendMSM = function (params) {
    const encyc = des.encrypt(params.phone)
    const sign = encyc.substr(0, 5) + encyc.substring(encyc.length-5)
    params.sign = sign.toUpperCase()
    return http.get(host + 'api/securitycode', {params}).then(data=>{
        return data.data
    })
}
