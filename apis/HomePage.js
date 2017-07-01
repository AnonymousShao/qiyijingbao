const http = require('axios')
const host = require('./config').host


function getHomeInfo(params) {
    params.rows = params.rows || 1
    params.page = params.page || 1
    // params.auctionStatus = params.auctionStatus || 1
    // params.account = params.account || 1
    return http.get(host + 'api/homepage', {params}).then(data=>(data.data.res_body))
}

module.exports = {
    getHomeAd: ()=>(
        http.get(host + '/api/homepage').then(data=>(data.data))
    ),
    getHomeArtist: (params)=>{
        params.page = params.page || 1
        params.rows = params.rows || 10
        return http.get(host + '/api/homepage', {params}).then(data=>(data.data.res_body))
    },
    getHomeAuction: (params)=>{
        params.flag = 1
        return getHomeInfo(params)
    },
    getHomeBargin: (params)=>{
        params.flag = 2
        return getHomeInfo(params)
    },
    getHomeExhibition: (params)=>{
        params.flag = 3
        return getHomeInfo(params)
    }
}

module.exports.getHomeAd()