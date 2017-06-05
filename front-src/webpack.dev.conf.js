/* global require, module */
const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    values = require('postcss-modules-values'),
    config = require('./config/index');
const publicPath = config.build.assetsPublicPath;

const isProd = process.env.NODE_ENV==='production'

let webpackConfig = {
    entry: {
        home:'./src/pages/home/index.js',
        login: './src/pages/login/index.js',
        demo: './src/pages/demo/index.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: publicPath,
        filename: "statics/[name]_bundle.js"
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
                use: 'css-loader!sass-loader'
            })
        },{
            test: /\.(png|jpe?g|ico)$/,
            loader: 'url-loader',
            query: {
                limit: 4196,
                name: 'statics/images/[name]_[hash:6].[ext]',
            },
        }]
    },
    plugins: [
        new ExtractTextPlugin('statics/css/style.css'),
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
        'draft-js': 'Draft'
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
