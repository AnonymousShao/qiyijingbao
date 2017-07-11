const router = require('koa-router')();
const { sendMSM, resetSendCode, resetPwd, login, register, wxlogin} = require('../apis/SecurityCode')
const cached = require('../globals/cached')
const {error, success, successCode} = require('./config')

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
    if(!phone) return
    ctx.body = await sendMSM({phone}).then(data=>{
        if(data.data.res_code===successCode){
            ctx.session.SecurityCode = data.data.res_body.SecurityCode
            return success('OK')
        }
        return data.data
    })
})

router.get('/resetSendCode', async function (ctx, next) {
    const phone = ctx.request.query.phone
    if(!phone) {
        return
    }
    ctx.body = await resetSendCode({phone}).then(data=>{
        if(data.data.res_code === successCode){
            return success('OK')
        }
        return data.data
    })
})

router.post('/resetPwd', async function (ctx, next) {
    const { phone, code, imgCode, password } = ctx.request.body
    if(!ctx.session.imgCode){
        ctx.body = error('验证码已过期！')
        return
    }
    if(imgCode !== ctx.session.imgCode){
        ctx.body = error('验证码有误！')
        return
    }
    ctx.body = await resetPwd({phone, code, password}).then(data=>{
        if(data.data.res_code === successCode){
            return success('OK')
        }
        return data.data
    })
})

router.post('/login', async function (ctx, next) {
    const { phone, password, imgCode } = ctx.request.body
    if(!ctx.session.imgCode){
        ctx.body = error('验证码已过期！')
        return
    }
    if(imgCode !== ctx.session.imgCode){
        ctx.body = error('验证码有误！')
        return
    }
    ctx.body = await login({phone, password}).then(data=>{
        if(data.data.res_code === successCode){
            ctx.session.userInfo = Object.assign({}, data.data.res_body.Pre_MemberInfoView[0], {
                expirate_time: data.data.res_body.expirate_time,
                session_secret: data.data.res_body.session_secret,
                token: data.data.res_body.token
            })
            return success('OK')
        }
        return data.data
    })
})

router.post('/register', async function (ctx) {
    const {phone, password, code, imgCode} = ctx.request.body
    if(!ctx.session.imgCode){
        ctx.body = error('验证码已过期！')
        return
    }
    if(imgCode !== ctx.session.imgCode){
        ctx.body = error('验证码有误！')
        return
    }
    ctx.body = await register({phone, password, code}).then(data=>{
        if(data.data.res_code === successCode){
            ctx.body = success('注册成功')
        }
        return data.data
    })
})

router.post('/wxlogin', async function (ctx) {
    const { openid } = ctx.request.body
    if(!openid){
        return
    }
    ctx.body = await wxlogin({openid})
})

module.exports = router;
