const http = require('axios')
const host = require('./config').host

module.exports.getAuction = function () {
    return http.get(host + '/api/Auction').then(data=>(data.data.res_body))
}
