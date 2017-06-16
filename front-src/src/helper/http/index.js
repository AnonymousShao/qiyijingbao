import http from 'axios'
import config from '../config'
const host = config.server,
    success = config.success

// require('../mock')

const init = {
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
                    throw new Error(data)
                }
            })
            .catch(e=>{
                alert(e)
                throw new Error(e)
            })
    },
}

export function sendResetCode(params){
    return init.get('login/resetSendCode', params).then(data=>{
        debugger
        return data.res_code === success
    }).catch(()=>{
        return false
    })
}

export function resetPwd(params) {
    return init.post('/login/resetPwd', params)
}

export function login(params) {
    return init.post('/login/login', params)
}

export function register(params){
    return init.post('/login/register', params)
}
