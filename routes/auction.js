const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { getAuction, pricing, getSucRecord, alert } = require('../apis/Auction')
const { getComments, postComment} = require('../apis/Comments')
const { getArtistList, getWorkClass, getArtistIndex, getArtistInfo } = require('../apis/Artist')
const { nologin } = require('../apis/config')

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
        belongClassNo: ctx.request.query.classno || 1,
        // rows: ctx.request.query.rows || 1,
        // page: ctx.request.query.page || 1,
        // auctionStatus: ctx.request.query.state || 1,
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
    let paramStrategy = {
        strategyID: 1
    }
    ctx.body = await Promise.all([getAuction(params), getAuction(paramStrategy)]).then(response=>{
        const detail = response[0],
            strategy = response[1]
        detail.res_body['Strategy'] = strategy.res_body
        return detail
    })
})

router.get('/getAdv', async function (ctx) {
    let params = {
        pagetype: ctx.request.query.type
    }
    ctx.body = await getAuction(params)
})

router.get('/history', async function (ctx) {
    let params = {
        rows: 1,
        page: 1,
        auctionStatus: '3',
        classno: ctx.request.query.classno
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

router.get('/getLatestPrice', async function (ctx) {
    let params = {
        // nowPrice: ctx.request.query.nowPrice,
        // StartPrice: ctx.request.query.StartPrice,
        strAWorksNO: ctx.request.query.workno,
    }
    ctx.body = await getAuction(params)
})

router.get('/getStrategy', async function (ctx) {
    let params = {
        strategyID: ctx.request.query.strategyID || 1
    }
    ctx.body = await getAuction(params)
})

router.get('/isEnough', async function (ctx) {
    let params = {
        AuctionNO: "",
        AuctionWorkNO: "",
        Account: "",
        StartPrice: "",
    }
    ctx.body = await getAuction(params)
})

router.get('/submitAuctionWorkPrice', async function (ctx) {
    if(!ctx.session.userInfo){
        ctx.body = nologin()
        return
    }
    const userInfo = ctx.session.userInfo
    let params = {
        AuctionNO: ctx.request.query.AuctionNO,
        StartPrice: ctx.request.query.StartPrice,
        AuctionWorkNO: ctx.request.query.AuctionWorkNO,
        Account: userInfo.Account,
        Amount: ctx.request.query.Amount,
        IntMultipleAuction: ctx.request.query.IntMultipleAuction,
        IsCopper: ctx.request.query.IsCopper,
        token: userInfo.token,
        sessionSecret: userInfo.session_secret
    }

    ctx.body = await pricing(params)
})

router.get('/getBidRecord', async function (ctx) {
    let params = {
        auctionno: ctx.request.query.AuctionNO,
        auctionworkno: ctx.request.query.AuctionWorkNO,
        page: ctx.request.query.page || 1,
        rows: 10,
    }
    ctx.body = await getAuction(params)
})

router.get('/getComments', async function (ctx) {
    const userInfo = ctx.session.userInfo || {}
    let params = {
        key: ctx.request.query.auctionWorkNo,
        page: ctx.request.query.page || 1,
        rows: ctx.request.query.rows || 10,
        account: userInfo.Account || ''
    }
    ctx.body = await getComments(params)
})

router.get('/postComment', async function (ctx) {
    const userInfo = ctx.session.userInfo
    if(!userInfo) {
        ctx.body = nologin()
        return
    }
    let params = {
        Account: userInfo.Account,
        CommentInfo: ctx.request.query.comment,
        ReferenceNO: ctx.request.query.referenceNo,
        WorkNo: ctx.request.query.workNo
    }
    ctx.body = await postComment(params)
})

router.get('/getSucRecord', async function (ctx) {
    let params = {
        auctionno: ctx.request.query.auctionNo,
        page: ctx.request.query.page || 1,
        rows: ctx.request.query.rows || 10
    }
    ctx.body = await getSucRecord(params)
})

router.get('/alert', async function (ctx) {
    const userInfo = ctx.session.userInfo
    if(!userInfo){
        ctx.body = nologin()
        return
    }
    let params = {
        account: userInfo.Account,
        auctionno: ctx.request.query.auctionno,
        remindtypes: ctx.request.query.type,
    }
    ctx.body = await alert(params)
})

module.exports = router;
