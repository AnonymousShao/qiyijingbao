const http = require('axios')
const host = require('./config').host
const moment = require('moment')
const getInputObjectSignForH5 = require('../globals/apiSign').getInputObjectSignForH5
const WXPay = require('weixin-pay')
const wxMer = require('./config').wxMer

let wxPay = WXPay({
    appid: wxMer.APPID,
    mch_id: wxMer.MerID,
    partner_key: wxMer.APPSECRET
})

function orderAuth(params, signKey) {
    const auctionView = {
        Account: params.Account,
        Source: 4
    }

    const ApiValid = {
            sign: '',
            timestamp: moment().format('YYYYMMDDHHmmss'),
            token: params.token
        },
        Unionpay = {
            orderId:"",
            txnAmt:"",
            frontUrl:""
        };

    const data = {
        ApiValid,
        Unionpay,
        Pre_MemberInfoView: auctionView
    }

    const sessionSecret = params.sessionSecret

    let signField = getInputObjectSignForH5(auctionView.Account, ApiValid, data, signKey, sessionSecret)
    ApiValid.sign = signField.short_sign
    return data
}



module.exports.unionPay = function (params) {
    const data = orderAuth(params, 'addOrder')
    return http.post('/api/pay?flag=2', data).then(data=>data.data)
}
