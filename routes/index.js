const Router = require('koa-router');
const router = new Router()

const users = require('./users');
const home = require('./home');
const auction = require('./auction');
const login = require('./login');
const wx = require('./wx');
const artist = require('./artist');
const search = require('./search');
const bargain = require('./bargain');
const work = require('./work');
const comment = require('./comment');
const pay = require('./pay');
const similar = require('./similar');


router.use('/users', users.routes(), users.allowedMethods());
router.use('/home', home.routes(), home.allowedMethods());
router.use('/auction', auction.routes(), auction.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods())
router.use('/artist', artist.routes(), artist.allowedMethods())
router.use('/search', search.routes(), search.allowedMethods())
router.use('/bargain', bargain.routes(), bargain.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/pay', pay.routes(), pay.allowedMethods())
router.use('/similar', similar.routes(), similar.allowedMethods())

router.get('/', function (ctx) {
    ctx.body = '123123'
    ctx.response.redirect('/auction.html')
})

module.exports = router
