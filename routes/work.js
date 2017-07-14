const router = require('koa-router')();
const { getDetail } = require('../apis/Work')

router.get('/getWorkDetail', async function (ctx) {
    let params = {
        no: ctx.request.query.no
    }
    ctx.body = await getDetail(params)
})

module.exports = router;
