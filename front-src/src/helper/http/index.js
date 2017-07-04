import http from 'axios'
import {server as host, success} from '../config'

// require('../mock')

export const init = {
    get(){
        const params = arguments[1],
            url = host + arguments[0]
        return http.get(url, {params})
            .then(res=>{
                return res.data
        })
            .then(data=>{
                if(data.res_code === success){
                    return data
                }else {
                    alert(data.res_error)
                }
        })
            .catch(e=>{
                alert(e)
            })
    },
    put(){
        const url = arguments[0]?host+arguments[0]:'',
        data = arguments[1] || {}
        return http.put(url, data, arguments[2]||null)
            .then(res=>{
            return res.data
        })
            .then(data=>{
                if(data.res_code === success){
                    return data
                }else {
                    alert(data.res_error)
                }
        })
            .catch(e=>{
                alert(e)
            return 'error'
        })
    },
    post(){
        return http.post.apply(http, arguments)
            .then(res=>{
                return res.data
            })
            .then(data=>{
                if(data.res_code === success){
                    return data
                }else {
                    alert(data.res_error)
                }
            })
            .catch(e=>{
                alert(e)
            })
    },
}

export function sendResetCode(params){
    return init.get('/login/resetSendCode', params)
}

export function resetPwd(params) {
    return init.post('/login/resetPwd', params)
}

export function login(params) {
    return init.post('/login/login', params)
}

export function sendSMS(params) {
    return init.get('/login/sendMSMALL', params)
}

export function register(params){
    return init.post('/login/register', params)
}

export function getAuction() {
    return init.get('/auction').then(data=>(data.res_body))
}

export function getArtists() {
    return init.get('/auction/getArtistList').then(data=>(data.data))
}

export function getArtisitDetail(params) {
    return init.get('/artist/artistInfo', params).then(data=>data.res_body)
}

export function searchAuction(params) {
    return init.get('/search/auction', params).then(data=>data.res_body)
}

export function getSimilar(params) {
    return init.get('/search/getSimilar', params).then(data=>data.res_body)
}

export function getBidDetail(params) {
    return init.get('/search/getBidDetail', params).then(data=>data.res_body)
}

export function getWorkClass(params) {
    return init.get('/search/getWorkClass', params).then(data=>data.res_body)
}