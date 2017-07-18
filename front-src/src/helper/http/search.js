import { init } from './index'

export function getWorks(params){
    return init.get('/search/getWorks', params).then(data=>data.res_body)
}

export function getArtists(params){
    return init.get('/search/getArtists', params).then(data=>data.res_body)
}

export function getNews(params){
    return init.get('/search/getNews', params).then(data=>data.res_body)
}