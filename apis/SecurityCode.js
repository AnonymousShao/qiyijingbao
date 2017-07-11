const http = require('axios')
const des = require('../globals/crypt')
const getInputObjectSignForH5 = require('../globals/apiSign').getInputObjectSignForH5
const host = require('./config').host
const moment = require('moment')
const userInfo = require('../globals/user_info').userInfo
const {error, success, successCode } = require('./config')

module.exports.sendMSM = function (params) {
    const encyc = des.encrypt(params.phone)
    const sign = encyc.substr(0, 5) + encyc.substring(encyc.length-5)
    params.sign = sign.toUpperCase()
    return http.get(host + '/api/securitycode', {params})
}

module.exports.resetSendCode = function (params) {
    const encyc = des.encrypt(params.phone)
    const sign = encyc.substr(0, 5) + encyc.substring(encyc.length-5)
    params.sign = sign.toUpperCase()
    params.flag = 'resetpwd'
    return http.get(host + '/api/securitycode', {params})
}

function resetAndRegister(params, signKey) {
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
            timestamp: moment().format('YYYYMMDDHHmmss'),
            token: null
        },
        ApiSource = {
            source: 4   // h5
        };

    const data = {
        ApiValid,
        ApiSource,
        Pre_MemberInfoView: user
    }

    let signField = getInputObjectSignForH5(user.Account, ApiValid, data, signKey)
    ApiValid.sign = signField.short_sign
    return data
}

module.exports.resetPwd = function (params) {
    const data = resetAndRegister(params, 'reset')
    return http.post(host + '/api/member?flag=3', data)
}

module.exports.register = function (params) {
    const data = resetAndRegister(params, 'register')
    return http.post(host + '/api/member', data)
}

module.exports.login = function (params) {
    const {phone, password} = params
    const enPassword = des.sha512(password),
        data = {
            Pre_MemberInfoView: {
                Account: phone,
                Password: enPassword
            }
        }
    return http.post(host + '/api/Member?flag=1', data)
}

module.exports.wxlogin = function (params) {
    const {openid} = params,
    data = {
        Pre_MemberInfoView: {
            OpenID: openid
        }
    }

    return http.post(host + '/api/Member?flag=29', data).then(data=>{
        return data
    })
}

// module.exports.resetPwd({code: '2222', phone: '13248260782', password: '1234567abcD'})
