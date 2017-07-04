const http = require('axios')
const host = require('./config').host


module.exports.bargain = function (params) {
    return http.get(host + '/api/bargain', {params}).then(data=>{
        return data.data
    })
}

