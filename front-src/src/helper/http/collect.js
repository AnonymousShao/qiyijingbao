import { init } from './index'

export function collectArtist(params){
    return init.get('/collect/collectArtist', params).then(data=>data.res_body)
}

export function collectAuction(params){
    return init.get('/collect/collectArtist', params).then(data=>data.res_body)
}

export function collectBargain(params){
    return init.get('/collect/collectArtist', params).then(data=>data.res_body)
}