import { init } from './index'

export function getAuctionList() {
    return init.get('/auction/getAuction').then(data=>{
        if(data){
            return data.res_body
        }
    })
}

export function getAuctionListSeatNo(params) {
    return init.get('/auction/getAuctionListSeatNo', params).then(data=>data.res_body)
}

export function getAuctionDetail(params) {
    return init.get('/auction/getAuctionDetail', params).then(data=>data.res_body);
}

export function getScheduleList(params) {
    return init.get('/auction/getScheduleList', params).then(data=>(data.res_body))
}

export function getHistoryList(params) {
    return init.get('/auction/history', params).then(data=>data.res_body)
}

export function getLatestPrice(params) {
    return init.get('/auction/getLatestPrice', params).then(data=>data.res_body)
}

export function getStrategy(params) {
    return init.get('/auction/getStrategy', params).then(data=>data.res_body)
}

export function submitAuctionWorkPrice(params) {
    return init.get('/auction/submitAuctionWorkPrice', params)
}

export function getBidRecord(params) {
    return init.get('/auction/getBidRecord', params).then(data=>data.res_body)
}

export function getComments(params) {
    return init.get('/auction/getComments', params).then(data=>data.res_body)
}

export function postComment(params) {
    return init.get('/auction/postComment', params).then(data=>data.res_body)
}

export function getSucRecord(params) {
    return init.get('/auction/getSucRecord', params).then(data=>data.res_body)
}

export function alert(params) {
    return init.get('/auction/alert', params).then(data=>data.res_body)
}