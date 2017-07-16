/* global require, module */
const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    values = require('postcss-modules-values'),
    config = require('./config/index');
const publicPath = config.build.assetsPublicPath;
const find = require('./config/find_entry').find

const isProd = process.env.NODE_ENV==='production'

let webpackConfig = {
    entry: find('./src/pages/**/index.js'),
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: publicPath,
        filename: "statics/script/[name]_bundle.js"
    },
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
                // plugins: ["transform-decorators", ['import', {
                //     "libraryName": "antd",
                //     "libraryDirectory": "lib",   // default: lib
                //     "style": true
                // }]]
                plugins: [
                    'transform-runtime',
                    'transform-decorators-legacy',
                ]
            },
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?modules!postcss-loader'
            }),
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!less-loader'
            }),
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!sass-loader'
            })
        },{
            test: /\.(png|jpe?g|ico)$/,
            loader: 'url-loader',
            query: {
                limit: 4196,
                name: 'statics/images/[name]_[hash:6].[ext]',
            },
        }, {
            test: /\.(svg|eot|ttf|woff)$/,
            loader: 'url-loader',
            query: {
                limit: 419600,
                name: 'statics/css/[name]_[hash:6].[ext]',
            },
        }]
    },
    plugins: [
        new ExtractTextPlugin('statics/css/[name]_style.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    values
                ]
            }
        }),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { discardComments: {removeAll: true } },
        //     canPrint: true
        // })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'redux': 'Redux',
        'react-router-dom': 'ReactRouterDOM',
        'antd': 'antd',
        'moment': 'moment',
        'draft-js': 'Draft',
        'validator': 'validator',
        // 'react-iscroll': 'ReactIScroll',
        'iscrll': 'IScroll',
        'react-slick': 'Slider',
        'echarts': 'echarts'
    }
};

if(isProd){
    webpackConfig.watch = false;
    const ugly = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        mangle: false
    });
    webpackConfig.plugins.push(ugly);
    delete webpackConfig.devtool
}

module.exports = webpackConfig
