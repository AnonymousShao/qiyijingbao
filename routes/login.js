const router = require('koa-router')();
const { sendMSM } = require('../apis/SecurityCode')

router.get('/sendMSMALL', async function (ctx, next) {
    const phone = ctx.request.query.phone;
    if(phone){
        ctx.body = await sendMSM({phone})
    }
})

module.exports = router;
