const http = require('axios')
const des = require('../globals/crypt')
const host = require('./config').host
const moment = require('moment')
const userInfo = require('../globals/user_info').userInfo

module.exports.sendMSM = function (params) {
    const encyc = des.encrypt(params.phone)
    const sign = encyc.substr(0, 5) + encyc.substring(encyc.length-5)
    params.sign = sign.toUpperCase()
    return http.get(host + 'api/securitycode', {params}).then(data=>{
        return data.data
    })
}

module.exports.resetSendCode = function (params) {
    const encyc = des.encrypt(params.phone)
    const sign = encyc.substr(0, 5) + encyc.substring(encyc.length-5)
    params.sign = sign.toUpperCase()
    params.flag = 'resetpwd'
    return http.get(host + 'api/securitycode', {params}).then(data=>{
        return data.data
    }).catch(err=>{
        console.log(err)
    })
}

module.exports.resetPwd = function (params) {
    let {code, phone, password} = params
    const user = new userInfo()
    user.Account = phone
    user.Mobile = phone
    user.Password = des.sha512(password)
    user.securitycode = code
    user.RegisterTime = moment().format('YYYY-MM-DD HH:mm:ss')
    user.LastLoginTime = moment().format('YYYY-MM-DD HH:mm:ss')

    const ApiValid = {
        sign: '',
        timestamp: '',
        token: null
    }

    const data = {
        ApiSource: {
            source: 4   // h5
        },
        ApiValid,
        Pre_MemberInfoView: user
    }
    return http.post(host + 'api/member?flag=3', data).then(data=>{
        debugger
        return data
    }).catch(err=>{
        debugger
    })
}