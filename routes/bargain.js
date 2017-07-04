const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { bargain } = require('../apis/Bargain')

router.get('/getWork', async function (ctx, next) {
    const bargainworkno = ctx.request.query.bargainworkno,
        account = ''
    ctx.body = await bargain({bargainworkno, account})
})

module.exports = router