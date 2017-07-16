import { init } from './index'

export function getWorkInfo(params) {
    return init.get('/work/getWorkDetail', params).then(data=>data.res_body)
}
