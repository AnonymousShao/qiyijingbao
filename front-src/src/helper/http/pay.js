import { init } from './index'

export function payEnSecure() {
    return init.get('/pay/enSecure/').then(data=>data.res_body)
}
