import { init, } from './index'


export function getAuthNum() {
    return init.get('/api/Member?flag=32').then(data=>(data.res_body))
}

export function validating(params) {
    return init.post('/api/Member?flag=32', params).then(data=>(data.res_body))
}
