export const ALL_NEWS = 'ALL_NEWS'
export const MAKE_LOOKED = 'MAKE_LOOKED'
export const PUBLISH = 'PUBLISH'
export const WITHDRAW = 'WITHDRAW'
export const PUSHINSTANTLY = 'PUSHINSTANTLY'
export const DELETEITEM = 'DELETEITEM'
export const CURRENTPAGE = 'CURRENTPAGE'

export function allNews(news) {
    return {
        type: ALL_NEWS,
        data: news
    }
}

export function currentPage(current) {
    return {
        type: CURRENTPAGE,
        data: current
    }
}