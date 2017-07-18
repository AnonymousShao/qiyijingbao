const router = require('koa-router')();
const { getSimilar } = require('../apis/work_similar')


router.get('/getWorkClass', async function (ctx) {
    let params = {
        belongClassNo: ctx.request.query.belongClassNo
    }
    ctx.body = await getSimilar(params)
})

router.get('/getWorkList', async function (ctx) {
    let params = {
        belongClassNo: ctx.request.query.belongClassNo,
        workclassno: ctx.request.query.workclassno,
        theme: ctx.request.query.theme,
    }
    ctx.body = await getSimilar(params)
})

module.exports = router
