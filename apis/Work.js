const http = require('axios')
const host = require('./config').host

module.exports.getDetail = function (params) {
    return http.get(host + '/api/work', {params}).then(data=>data.data)
}
// http://121.40.166.187:9999/api/work?no=W20170419154238