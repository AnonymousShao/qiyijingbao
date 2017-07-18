const http = require('axios')

module.exports.search = function (params) {
    return http.get('/api/search', {params}).then(data=>data.data)
}
