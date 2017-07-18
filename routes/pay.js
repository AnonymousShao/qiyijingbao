const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { unionPay, wxPay } = require('../apis/Pay')
const { nologin } = require('../apis/config')

router.get('/enSecure', async function (ctx) {
    let params = {
        openId: ctx.session.userInfo.openId
    }
    ctx.body = await wxPay(params)
})

module.exports = router