const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { getAuction } = require('../apis/Auction')
const { getArtistList, getWorkClass, getArtistIndex, getArtistInfo } = require('../apis/Artist')

router.get('/', async function (ctx, next) {
    ctx.body = await getAuction()
})

router.get('/getAuction', async function (ctx) {
    let params = {
        rows: ctx.request.query.rows || 1,
        page: ctx.request.query.page || 1,
        auctionStatus: ctx.request.query.state || 2,
        account: ''
    }
    ctx.body = await getAuction(params)
})

router.get('/getScheduleList', async function (ctx) {
    let params = {
        type: ctx.request.query.type || 1,
        // rows: ctx.request.query.rows || 1,
        // page: ctx.request.query.page || 1,
        // auctionStatus: ctx.request.query.state || 1,
        account: ''
    }
    ctx.body = await getAuction(params)
})

router.get('/getAuctions', async function (ctx) {
    let params = {
        auctionStatus: ctx.request.query.state || 1,
        types: ctx.request.query.type || 1,
    }
    ctx.body = await getAuction(params)
})

router.get('/getAuction2', async function (ctx) {
    let params = {
        type: ctx.request.query.type || 1,
    }
    ctx.body = await getAuction(params)
})

router.get('/getAuctionListSeatNo', async function (ctx) {
    let params = {
        rows: ctx.request.query.rows,
        page: ctx.request.query.page,
        auctionno: ctx.request.query.auctionno,
        workclassno: ctx.request.query.workclassno,
    }
    ctx.body = await getAuction(params)
})

router.get('/getAuctionDetail', async function (ctx) {
    let params = {
        auctionworkno: ctx.request.query.no,
        account: ''
    }
    ctx.body = await getAuction(params)
})

// router.get('/getAuctions', async function (ctx) {
//     let params = {
//
//     }
//     ctx.body = await getAuction(params)
// })
//
// router.get('/getAuctions', async function (ctx) {
//     let params = {
//
//     }
//     ctx.body = await getAuction(params)
// })

router.get('/getArtistList', async function (ctx) {
    const page = ctx.request.query.page,
        rows = ctx.request.query.rows

    ctx.body = await Promise.all([getWorkClass({parentno:0}), getArtistList({page, rows})]).then(response=>{
        const workClassRes = response[0],
            artistListRes = response[1]
        if(workClassRes.res_code==='0' && artistListRes.res_code==='0'){
            const workClass = workClassRes.res_body.WorkClass.map(work=>{
                if(work.Description.trim()!=='F'){
                    return {
                        description: work.Description,
                        name: work.Name
                    }
                }
            }).filter(data=>(data))
            return {
                data: {
                    artistList: artistListRes.res_body.ArtistsList,
                    workClass: workClass
                },
                res_code: workClassRes.res_code
            }
        } else {
            return {
                data: null,
                res_code: artistListRes.res_code + workClassRes.res_code,
                res_error: artistListRes.res_error + workClassRes.res_error
            }
        }
    })

})

router.get('/getArtistIndex', async function (ctx) {
    const id = ctx.request.query.id
    if(!id) return
    ctx.body = await getArtistIndex({ref_artistno: id})
})

router.get('/getArtistInfo', async function (ctx) {
    const id = ctx.request.query.id
    if (!id) return
    ctx.body = await getArtistInfo({artistno: id})
})

module.exports = router;
