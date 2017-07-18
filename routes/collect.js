const router = require('koa-router')();
const { collect } = require('../apis/Collect')


router.get('/collectArtist', async function (ctx) {
    let params = {
        collecttype: 3,
        operateflag: ctx.request.query.operateflag,
        ref_no: ctx.request.query.no
    }
    ctx.body = await collect(params)
})

router.get('/collectAuction', async function (ctx) {
    let params = {
        collecttype: 1,
        operateflag: ctx.request.query.operateflag,
        ref_no: ctx.request.query.no
    }
    ctx.body = await collect(params)
})

router.get('/collectBargain', async function (ctx) {
    let params = {
        collecttype: 2,
        operateflag: ctx.request.query.operateflag,
        ref_no: ctx.request.query.no
    }
    ctx.body = await collect(params)
})



module.exports = router