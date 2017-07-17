const router = require('koa-router')();
const { getComments, postComment } = require('../apis/Comments')
const { nologin, successCode } = require('../apis/config')

router.get('/getComments', async function (ctx) {
    const userInfo = ctx.session.userInfo || {}
    let params = {
        key: ctx.request.query.no,
        page: ctx.request.query.page || 1,
        rows: ctx.request.query.rows || 10,
        account: userInfo.Account || ''
    }
    ctx.body = await getComments(params)
})

router.get('/postComment', async function (ctx) {
    const userInfo = ctx.session.userInfo
    if(!userInfo) {
        ctx.body = nologin()
        return
    }
    let params = {
        Account: userInfo.Account,
        CommentInfo: ctx.request.query.comment,
        ReferenceNO: ctx.request.query.referenceNo,
        WorkNo: ctx.request.query.workNo
    }
    ctx.body = await postComment(params)
})

module.exports = router