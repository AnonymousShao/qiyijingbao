const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { getAuction } = require('../apis/Auction')

router.get('/', async function (ctx, next) {
    ctx.body = await getAuction()
})

module.exports = router;
