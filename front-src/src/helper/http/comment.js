import { init } from './index'

export function getComments(params) {
    return init.get('/comment/getComments', params).then(data=>data.res_body)
}

export function postComment(params) {
    return init.get('/comment/postComment', params).then(data=>data.res_body)
}
