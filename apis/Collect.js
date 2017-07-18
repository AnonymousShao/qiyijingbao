const http = require('axios')
const host = require('./config').host

module.exports.collect = function (params) {
    return http.get('/api/collect', params).then(data=>data.data)
}
