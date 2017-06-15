const router = require('koa-router')();

router.get('/', function (ctx) {
    ctx.body = 'weixin'
})

module.exports = router