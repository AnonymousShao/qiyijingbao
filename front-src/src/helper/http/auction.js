import { init } from './index'

export function getAuctionList() {
    return init.get('/auction/getAuction').then(data=>{
        if(data){
            return data.res_body
        }
    })
}

export function getAuctionListSeatNo(params) {
    return init.get('/auction/getAuctionListSeatNo', params)
}

export function getAuctionDetail(params) {
    return init.get('/auction/getAuctionDetail', params)
}