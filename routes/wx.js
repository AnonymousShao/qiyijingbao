const router = require('koa-router')();
const {getCodeUrl, getUnionId, getUserInfo}= require('../globals/weixin')

router.get('/', function (ctx) {
    ctx.body = 'weixin'
})

router.get('/wxlogin', function (ctx) {
    const sourceUrl = ctx.request.query.sourceurl,
        url = getCodeUrl(sourceUrl);
    ctx.session.sourceUrl = sourceUrl
    ctx.response.redirect(url)
})

router.get('/getcode', async function (ctx) {
    const code = ctx.request.query.code
    if(!code){
        ctx.body = 'error: no code!'
        return
    }

    let userData = await getUnionId(code)
    const openId = userData.data.openid,
        accessToken = userData.data.access_token

    let userInfo = await getUserInfo({accessToken, openId})
    let sourceUrl = ctx.session.sourceUrl || '/'
    ctx.response.redirect(sourceUrl)
    ctx.body = userInfo.data
})

module.exports = router