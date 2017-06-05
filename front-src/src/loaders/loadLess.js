var less = require('less');
var pify = require('pify');
var processResult = require('../../node_modules/less-loader/dist/processResult');
var getOptions = require('../../node_modules/less-loader/dist/getOptions');

var render = pify(less.render.bind(less));

function lessLoader(source) {
    console.log('*'.repeat(100))
    console.log(typeof source)
    console.log('*'.repeat(100))
    var loaderContext = this;
    var options = getOptions(loaderContext);
    var done = loaderContext.async();
    var isSync = typeof done !== 'function';

    if (isSync) {
        throw new Error('Synchronous compilation is not supported anymore. See https://github.com/webpack-contrib/less-loader/issues/84');
    }

    processResult(loaderContext, render(source, options));
}

module.exports = lessLoader;