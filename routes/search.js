const router = require('koa-router')();
const { getAuction } = require('../apis/Auction')
const { getWorkClass } = require('../apis/Artist')
const { getSimilar } = require('../apis/artist_similar')
const { search } = require('../apis/Search')

router.get('/auction', async function (ctx) {
    const page = ctx.request.query.page || 1;
    const rows = ctx.request.query.rows || 100,
        auctionStatus = 0,
        account = ''

    const params = {
        page, rows, auctionStatus, account
    }
    ctx.body = await getAuction(params)
})

router.get('/artist', async function (ctx) {
    
    ctx.body = await function () {

    }
})

router.get('/getSimilar', async function (ctx) {
    const ref_artistno = ctx.request.query.ref_artistno,
        ref_workclassno = ctx.request.query.ref_workclassno,
        theme = ctx.request.query.theme
    let params = {
        ref_artistno, ref_workclassno, theme
    }
    ctx.body = await getSimilar(params)
})

router.get('/getWorkClass', async function (ctx) {
    let params = {
        parentno: ctx.request.query.parentno || 0
    }
    ctx.body = await getWorkClass(params)
})

router.get('/getBidDetail', async function (ctx) {
    let params = {
        workno: ctx.request.query.workno
    }
    ctx.body = await getSimilar(params)
})

router.get('/getArtists', async function (ctx) {
    let params = {
        type: 2,
        key: ctx.request.query.key,
        iPageIndex: ctx.request.query.index || 1,
        iPageSize: ctx.request.query.pageSize || 10
    }
    ctx.body = await search(params)
})

router.get('/getWorks', async function (ctx) {
    let params = {
        type: 1,
        key: ctx.request.query.key,
        iPageIndex: ctx.request.query.index || 1,
        iPageSize: ctx.request.query.pageSize || 10
    }
    ctx.body = await search(params)
})

router.get('/getNews', async function (ctx) {
    let params = {
        type: 3,
        key: ctx.request.query.key,
        iPageIndex: ctx.request.query.index || 1,
        iPageSize: ctx.request.query.pageSize || 10
    }
    ctx.body = await search(params)
})

module.exports = router
