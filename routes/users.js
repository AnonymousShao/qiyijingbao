const router = require('koa-router')();
const genImage = require('captchapng')

router.get('/', function (ctx, next) {
    const p = new genImage(60, 35, 4423)
    p.color(200, 200, 200, 1)
    p.color(195, 19, 32, 255)
    let img = p.getBase64()
    ctx.set({
        'content-type': 'image/png'
    })
    ctx.body = new Buffer(img, 'base64');
});

module.exports = router;
