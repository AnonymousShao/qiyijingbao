import { init, } from './index'


export function getArtistDataList(params) {
    return init.get('/artist/getArtistDataList', params).then(data=>(data.res_body))
}