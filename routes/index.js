const Router = require('koa-router');
const router = new Router()

const users = require('./users');
const home = require('./home');
const auction = require('./auction');
const login = require('./login');

router.use('/users', users.routes(), users.allowedMethods());
router.use('/home', home.routes(), home.allowedMethods());
router.use('/auction', auction.routes(), auction.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());

module.exports = router