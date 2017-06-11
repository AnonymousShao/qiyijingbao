const router = require('koa-router')();
const { sendMSM, resetSendCode, resetPwd, login, register, wxlogin} = require('../apis/SecurityCode')
const cached = require('../globals/cached')

// cached.set('tst:sdfj', 324).then(statue=>{
//
// }).catch(err=>{
//     console.log(err)
// })
//
// cached.get('tst:sdfj').then(data=>{
//
// }).catch(err=>{
//
// })

router.get('/sendMSMALL', async function (ctx, next) {
    const phone = ctx.request.query.phone;
    if(phone){
        ctx.body = await sendMSM({phone})
    }
})

router.get('/resetSendCode', async function (ctx, next) {
    const phone = ctx.request.query.phone
    if(phone) {
        ctx.body = await resetSendCode({phone})
    }
})

router.post('/resetPwd', async function (ctx, next) {
    const { phone, code, password } = ctx.request.body
    if(!phone || !code || !password){
        return
    }
    ctx.body = await resetPwd({phone, code, password})
})

router.post('/login', async function (ctx, next) {
    const { phone, password, imgCode } = ctx.request.body
    if(!phone || !imgCode || !password){
        return
    }
    ctx.body = await login({phone, password, imgCode})
})

router.post('/register', async function (ctx) {
    const {phone, password, code, imgCode} = ctx.request.body
    if(!phone || !code || !password){
        return
    }
    ctx.body = await register({phone, password, imgCode})
})

router.post('/wxlogin', async function (ctx) {
    const { openid } = ctx.request.body
    if(!openid){
        return
    }
    ctx.body = await wxlogin({openid})
})

module.exports = router;
