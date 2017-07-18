const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { bargain } = require('../apis/Bargain')

router.get('/getHomeAdv', async function (ctx) {
    let params = {
        pagetype: 11
    }

    ctx.body = await bargain(params)
})

router.get('/getBargainList', async function (ctx) {
    let params = {
        workclassno: ctx.request.query.classNo,
        priceZoneLeft: ctx.request.query.min || 0,
        priceZoneRight: ctx.request.query.max || null,
        key: ctx.request.query.key || null,
        rows: 1000,
        page: 1
    }
    console.log(params)
    ctx.body = await bargain(params)
})

router.get('/getWork', async function (ctx, next) {
    const bargainworkno = ctx.request.query.bargainworkno,
        account = ''
    ctx.body = await bargain({bargainworkno, account})
})


module.exports = router