const http = require('axios')
const host = require('./config').host

module.exports.getAuction = function (params) {
    return http.get(host + '/api/Auction', {params}).then(data=>{
        return data.data
    })
}
