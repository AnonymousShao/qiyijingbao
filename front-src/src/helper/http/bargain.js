import { init } from './index'

export function getWork(params) {
    return init.get('/bargain/getWork', params).then(data=>(data.res_body))
}