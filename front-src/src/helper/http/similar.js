import { init } from './index'

export function getWorkList(params) {
    return init.get('/similar/getWorkList/', params).then(data=>data.res_body)
}

export function getWorkClass(params) {
    return init.get('/similar/getWorkClass/', params).then(data=>data.res_body)
}

