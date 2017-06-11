const router = require('koa-router')();
const BaseConst = require('../globals/BaseConst')
const { getAuction } = require('../apis/Auction')
const { getArtistList, getWorkClass, getArtistIndex, getArtistInfo } = require('../apis/Artist')

router.get('/', async function (ctx, next) {
    ctx.body = await getAuction()
})

router.get('/getArtistList', async function (ctx) {
    const page = ctx.request.query.page,
        rows = ctx.request.query.rows

    ctx.body = await Promise.all([getWorkClass(), getArtistList({page, rows})]).then(response=>{
        const workClassRes = response[0],
            artistListRes = response[1]
        if(workClassRes.res_code==='0' && artistListRes.res_code==='0'){
            const workClass = workClassRes.res_body.WorkClass.map(work=>{
                if(work.Description.trim()!=='F'){
                    return {
                        description: work.Description,
                        name: work.Name
                    }
                }
            }).filter(data=>(data))
            return {
                data: {
                    artistList: artistListRes.res_body.ArtistsList,
                    workClass: workClass
                },
                res_code: workClassRes.res_code
            }
        } else {
            return {
                data: null,
                res_code: artistListRes.res_code + workClassRes.res_code,
                res_error: artistListRes.res_error + workClassRes.res_error
            }
        }
    })

})

router.get('/getArtistIndex', async function (ctx) {
    const id = ctx.request.query.id
    if(!id) return
    ctx.body = await getArtistIndex({ref_artistno: id})
})

router.get('/getArtistInfo', async function (ctx) {
    const id = ctx.request.query.id
    if (!id) return
    ctx.body = await getArtistInfo({artistno: id})
})

module.exports = router;
