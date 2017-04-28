/**
 * @file webpack公用工具
 * @author memoryza(jincai.wang@foxmail.com)
 */
require('regenerator-runtime/runtime')
process.traceDeprecation = true;
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonApi = require('../util/common');
const rollupPlugin = require('rollup-plugin-babel');
// 页面存放目录
const pageFolder = 'page';
// 遍历所有页面
const pages = fs.readdirSync(path.join(commonApi.srcPath, pageFolder)).filter(function (page) {
    return page.indexOf('.') !== 0;
});

const entry = {};
const htmls = {};
pages.forEach(function (page) {
    let file = [commonApi.srcPath, pageFolder, page, page].join('/');
    entry[page] = file;
    page != 'common' && (htmls[page] = file + '.html');
});
// 是否是测试环境注入
if (commonApi.debugTool) {
    entry.vconsole = commonApi.projectDir + '/node_modules/vconsole/dist/vconsole.min.js';
}
// 设置只有本地开发环境才有的bnjs注入
if (commonApi.polyfill) {
    entry.polyfill = commonApi.watchFileDir +  '/common/libs/polyfill/index.js';
}
module.exports = {
    context: commonApi.srcPath,
    entry: entry,
    output: {
        path: commonApi.modulePath,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/chunk/[name].[hash:8].js',
        // css文件中的img的url前缀会加publicPath
        publicPath: '../'
    },
    module: {
        // devtool: 'inline-source-map',
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.vue$/,
                loader: 'vue'
            },{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['vue', 'es2015'],
                    ignore: [],
                    plugins: [
                        ['transform-runtime', {
                          helpers: false,
                          polyfill: false,
                          regenerator: true, }
                        ],
                        'transform-es2015-destructuring',
                        'transform-object-rest-spread',
                        'transform-async-to-generator',
                    ],
                    compact: false
                }
            },
            {
                test: /\.js$/,
                loader: 'rollup-loader',
                // webpack-dev-server会动态的向entry里面注入node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8081 这个，所以要过滤掉
                exclude: [/node_modules/],
                options: {
                  plugins: [
                    rollupPlugin({})
                  ]
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[hash].[ext]' // 相对output.path
            }, {
                test: /\.json$/i,
                use: 'json-loader'
            }
        ],
        noParse: [
            /zepto\1/,
            /vconsole\1/
        ]
    },
    resolve: {
        // root: commonApi.srcPath,
        modules: [commonApi.srcPath, 'node_modules'],
        alias: {
            dep: commonApi.depPath,
            mock: commonApi.mockPath,
            pkg: commonApi.pkg,
            util: path.join(commonApi.commonPath, 'util'),
            config: path.join(commonApi.commonPath, 'config'),
            gwidget: path.join(commonApi.commonPath, 'widget'),
            widget: path.join(commonApi.srcPath, 'widget')
        }
    },
    plugins: (function () {
        var plugins = [
            new webpack.DefinePlugin({
                __DEV__: commonApi.isDev,
                __QA__: commonApi.isQa,
                __PRO__: commonApi.isPro
            }),
            new ExtractTextPlugin('css/[name].[contenthash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'js/[name].[hash:8].js',
                minChunks: 2,
                pageChunks: Object.keys(entry)
            })
        ];
        var tplPath = path.join(commonApi.watchFileDir, 'common/config/layout.html');
        for (var page in htmls) {
            if (page && htmls.hasOwnProperty(page) && htmls[page]) {
                var chunks = ['common', page];
                if (commonApi.debugTool) {
                    chunks.push('vconsole');
                }
                if (commonApi.polyfill) {
                    chunks.push('polyfill');
                }
                plugins.push(new HtmlWebpackPlugin({
                    template: tplPath,
                    filename: 'html/' + page + '.html',
                    inject: true,
                    debug: commonApi.isPro ? false : true,
                    page: page,
                    chunks: chunks
                }));
            }
        }
        return plugins;
    })()
}
