const http = require('axios')
const host = require('./config').host

module.exports.getSimilar = function (params) {
    return http.get(host + '/api/ArtistSimilar', {params}).then(data=>{
        return data.data
    })
}


// module.exports.getSimilar()