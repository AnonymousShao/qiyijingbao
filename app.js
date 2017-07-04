const path = require('path');
const Koa = require('koa');
const app = new Koa();
const server = require('koa-static')
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session')
// const session = require('koa-generic-session')
// const redisStore = require('koa-redis');
// const views = require('koa-views');

app.keys = ['this is my session oooooh'];
const router = require('./routes')
const staticRoot = path.resolve(__dirname, 'front-src/dist/')
require('axios').defaults.headers.get['Content-Type'] = 'application/json'
require('axios').defaults.headers.post['Content-Type'] = 'application/json'

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
}

app.use(session(CONFIG, app))
app.use(convert(bodyParser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(logger2);
app.use(router.routes(), router.allowedMethods());
app.use(server(staticRoot));  // static assets

// app.on('error', function(err, ctx){
//   console.log(err)
//   log.error('server error', err, ctx);
// });

async function logger2(ctx, next){
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

module.exports = app;
