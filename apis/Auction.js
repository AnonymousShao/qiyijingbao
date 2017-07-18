const http = require('axios')
const host = require('./config').host
const moment = require('moment')
const getInputObjectSignForH5 = require('../globals/apiSign').getInputObjectSignForH5

function bidAuth(params, signKey) {
    const auctionView = {
        Account: params.Account,
        AuctionNO: params.AuctionNO,
        AuctionWorkNO: params.AuctionWorkNO,
        Amount: params.Amount,
        IntMultipleAuction: params.IntMultipleAuction,
        IsCopper: params.IsCopper,
        Source: 4
    }

    const ApiValid = {
            sign: '',
            timestamp: moment().format('YYYYMMDDHHmmss'),
            token: params.token
        },
        ApiSource = {
            source: 4   // h5
        };

    const data = {
        ApiValid,
        ApiSource,
        Pre_MemberInfoAuctionLogView: auctionView
    }

    const sessionSecret = params.sessionSecret

    let signField = getInputObjectSignForH5(auctionView.Account, ApiValid, data, signKey, sessionSecret)
    ApiValid.sign = signField.short_sign
    return data
}

module.exports.getAuction = function (params) {
    return http.get(host + '/api/Auction', {params}).then(data=>{
        return data.data
    })
}

module.exports.getAuctionV2 = function (params) {
    return http.get(host + '/api/auctionsimple', {params}).then(data=>data.data)
}

module.exports.pricing = function (params) {
    const data = bidAuth(params, 'bid')
    return http.post(host + '/api/Auction?flag=1', data).then(data=>data.data)
}

module.exports.alert = function (params) {
    return http.get(host + '/api/auctionsimple', {params})
}
