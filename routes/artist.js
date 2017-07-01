const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const {getArtistInfo, getArtistDataList} = require('../apis/Artist')

router.get('/artistInfo', async function (ctx) {
    const artistNo = ctx.request.query.artistno;
    const params = {
        artistno: artistNo
    }

    ctx.body = await getArtistInfo(params)
})

router.get('/getArtistDataList', async function (ctx) {
    const artistno = ctx.request.query.artistno
    ctx.body = await getArtistDataList({ref_artistno: artistno})
})


module.exports = router