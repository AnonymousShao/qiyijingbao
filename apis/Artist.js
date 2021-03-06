const http = require('axios')
const host = require('./config').host

module.exports.getArtistList = function (params) {
    params.page = params.page || 1
    params.rows = params.rows || 1000
    return http.get(host + '/api/artist',{params}).then(data=>(data.data))
}

module.exports.getClass = function (params) {
    return http.get(host + '/api/artist', {params}).then(data=>data.data)
}

module.exports.getWorkClass = function (params) {
    return http.get(host + '/api/artist', {params}).then(data=>(data.data))
}

module.exports.getArtistIndex = function (params) {
    return http.get(host + '/api/artist', {params}).then(data=>(data.data))
}

module.exports.getArtistInfo = function (params) {
    return http.get(host + '/api/artist', {params}).then(data=>(data.data))
}

module.exports.getArtistDataList = function (params) {
    if(!params.ref_artistno){
        return
    }
    return http.get(host + '/api/artist', {params}).then(data=>(data.data))
}