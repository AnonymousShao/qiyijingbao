const http = require('axios')
const moment = require('moment')
const getInputObjectSignForH5 = require('../globals/apiSign').getInputObjectSignForH5
const WXPay = require('weixin-pay')
const wxMer = require('./config').wxMer

let wxPay = WXPay({
    appid: wxMer.APPID,
    mch_id: wxMer.MerID,
    partner_key: wxMer.APPKEY
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

module.exports.wxPay = function (params) {
    return new Promise((res, rej)=>{
        wxPay.getBrandWCPayRequestParams({
            openid: params.openId,
            body: '支付测试',
            out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
            total_fee: 1,
            spbill_create_ip: '192.168.2.210',
            notify_url: 'http://testapi.qiyitianbao.com/artdeal/api/wxh5paychargenotify',
            trade_type: 'JSAPI',
            product_id: '1234567890'
        }, function(err, result){
            if(err){
                rej(err)
            } else {
                res(result)
            }
        })
    })
}
