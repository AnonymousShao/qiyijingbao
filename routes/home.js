const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const {getHomeAd, getHomeArtist, getHomeAuction, getHomeBargin, getHomeExhibition} = require('../apis/HomePage')

router.get('/ad', async function (ctx, next) {
    ctx.body = await getHomeAd()
})

router.get('/artists', async function (ctx, next) {
    ctx.body = await getHomeArtist(ctx.request.query)
})

router.get('/auction', async function (ctx, next) {
    ctx.body = await getHomeAuction(ctx.request.query)
})

router.get('/bargin', async function (ctx, next) {
    ctx.body = await getHomeBargin(ctx.request.query)
})

router.get('/exhibition', async function (ctx, next) {
    ctx.body = await getHomeExhibition(ctx.request.query)
})

module.exports = router;
