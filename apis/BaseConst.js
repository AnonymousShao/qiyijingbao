const http = require('axios')
const host = require('./config').host

module.exports.baseConst = function baseConst(){
    return http.get(host + 'api/BaseConst/').then(data=>{
        return data.data.res_body
    })
}
