import http from 'axios'
import config from '../config'
const host = config.server

// require('../mock')

const init = {
    get(){
        const params = arguments[1],
            url = arguments[0]?host + arguments[0]: ''
        return http.get(url, {params})
            .then(res=>{
            return res.data
        })
            .then(data=>{
            if(data.code === '200'){
                return data
            }else {
                alert(data.message)
            }
        }).catch(e=>{
            alert(e)
            })
    },
    put(){
        const url = arguments[0]?host+arguments[0]:'',
        data = arguments[1] || {}
        return http.put(url, data, arguments[2]||null).then(res=>{
            return res.data
        }).then(data=>{
            if(data.code === '200'){
                return data
            } else {
                alert(data.message)
            }
        }).catch(e=>{
            alert(e)
            return 'error'
        })
    }
}

export function t() {
    return init.get('api/1/keys/choices/')
}

export function getNews(id) {
    return init.get('api/1/news/'+id)
}

export function getAllNews(params) {
    return init.get('api/1/news/', params)
}

export function putNews(pk, data) {
    return init.put(`api/1/news/${pk}`, data)
}