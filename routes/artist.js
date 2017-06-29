const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const {getArtistInfo} = require('../apis/Artist')

router.get('/artistInfo', async function (ctx) {
    const artistNo = ctx.request.query.artistNo;
    const params = {
        artistno: artistNo
    }

    ctx.body = await getArtistInfo(params)
})

module.exports = router