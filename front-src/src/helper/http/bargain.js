import { init } from './index'

export function getHomeAdv(params) {
    return init.get('/bargain/getHomeAdv', params).then(data=>data.res_body)
}

export function getBargainList(params) {
    return init.get('/bargain/getBargainList', params).then(data=>data.res_body)
}

export function getWork(params) {
    return init.get('/bargain/getWork', params).then(data=>data.res_body)
}
