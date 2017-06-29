const Router = require('koa-router');
const router = new Router()

const users = require('./users');
const home = require('./home');
const auction = require('./auction');
const login = require('./login');
const wx = require('./wx');
const artist = require('./artist');
const search = require('./search');


router.use('/users', users.routes(), users.allowedMethods());
router.use('/home', home.routes(), home.allowedMethods());
router.use('/auction', auction.routes(), auction.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods())
router.use('/artist', artist.routes(), artist.allowedMethods())
router.use('/search', search.routes(), search.allowedMethods())

router.get('/', function (ctx) {
    ctx.body = '123123'
    ctx.response.redirect('/login.html')
})

module.exports = router
