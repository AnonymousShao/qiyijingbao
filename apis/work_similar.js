const http = require('axios')
const host = require('./config').host

module.exports.getSimilar = function (params) {
    return http.get(host + '/api/worksimilar', {params}).then(data=>data.data)
}
