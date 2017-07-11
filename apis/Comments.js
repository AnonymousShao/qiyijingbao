const http = require('axios')
const host = require('./config').host


module.exports.getComments = function (params) {
    return http.get(host + '/api/comments', {params}).then(data=>data.data)
}
