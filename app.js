const path = require('path');
const Koa = require('koa');
const app = new Koa();
const server = require('koa-static')
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser')();
const logger = require('koa-logger');
// const views = require('koa-views');
// const co = require('co');

const router = require('./routes')
const staticRoot = path.resolve(__dirname, 'front-src/dist/')
require('axios').defaults.headers.get['Content-Type'] = 'application/json'

// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }));
// middlewares
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
