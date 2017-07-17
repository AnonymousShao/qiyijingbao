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
        // priceZoneLeft: "",
        // priceZoneRight:'',
        // key:'',
        rows: 1000,
        page: 1
    }
    ctx.body = await bargain(params)
})

router.get('/getWork', async function (ctx, next) {
    const bargainworkno = ctx.request.query.bargainworkno,
        account = ''
    ctx.body = await bargain({bargainworkno, account})
})


module.exports = router