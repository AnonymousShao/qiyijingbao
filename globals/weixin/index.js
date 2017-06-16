const http = require('axios')
const {APPID, APPKEY, APPSECRET} = require('./config')
const cached = require('../cached')
const ACCESSTOKEN = 'accessToken'
const TICKET = 'TICKET'

function unionUrl(params){
    let queryString = ''
    for(let item in params){
        queryString? queryString += '&': queryString += '?'
        queryString += `${item}=${params[item]}`
    }
    return queryString
}

function getAccessToken() {
    return cached.get(ACCESSTOKEN).then(data=>{
        if(data) return data

        const url = "https://api.weixin.qq.com/cgi-bin/token"
        let params = {
            grant_type: 'client_credential',
            appid: APPID,
            secret: APPSECRET
        }
        return http.get(url, {params}).then(({data})=>{
            const accessToken = data.access_token,
                expiresIn = data.expires_in;
            if(!accessToken){
                console.log('error in getting accessToken')
                return null
            }
            return accessToken
        })
    })
}

function getTicket() {
    return cached.get(TICKET).then(data=>{
        if(data) return data
        return getAccessToken().then(token=>{
            const url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
            let params = {
                access_token: token,
                type: 'jsapi'
            }
            return http.get(url, {params}).then(({data})=>{
                if(data.errcode === 0){
                    cached.set(TICKET, data.ticket, data.expires_in)
                }
            })
        })
    })
}

function getCodeUrl(redirectUri) {
    let url = "https://open.weixin.qq.com/connect/oauth2/authorize",
        params = {
            appid: APPID,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'snsapi_userinfo',
            state: 'STATE#wechat_redirect'
        }
    let queryString = unionUrl(params)
    return url + queryString
}

function getUnionId(code) {
    let url = 'https://api.weixin.qq.com/sns/oauth2/access_token',
        params = {
            appid: APPID,
            secret: APPSECRET,
            code: code,
            grant_type: 'authorization_code'
        }
    return http.get(url, {params})
}

function getUserInfo({accessToken, openId}){
    let url = 'https://api.weixin.qq.com/sns/userinfo',
        params = {
            access_token: accessToken,
            openid: openId,
            lang: 'zh_CN'
        }
    return http.get(url, {params})
}

module.exports = {
    getCodeUrl,
    getUnionId,
    getUserInfo
}