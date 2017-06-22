const router = require('koa-router')();
const genImage = require('captchapng')

router.get('/', function (ctx, next) {
    let code = ''
    while (code.length<4) {
        code += Math.floor(10 * Math.random())
    }
    ctx.session.imgCode = code
    const p = new genImage(60, 35, code)
    p.color(200, 200, 200, 1)
    p.color(195, 19, 32, 255)
    let img = p.getBase64()
    ctx.set({
        'content-type': 'image/png'
    })
    ctx.body = new Buffer(img, 'base64');
});

module.exports = router;
