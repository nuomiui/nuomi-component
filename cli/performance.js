/**
 * @file 组件性能测试
 * @author memoryza(jincai.wang@foxmail.com)
 */
const commonApi = require('./util/common');
const fs = require('fs');
const path = require('path');
if (!fs.existsSync(commonApi.srcPath)) {
    commonApi.onError('项目' + commonApi.args.module +  '不存在，请检查' + commonApi.srcPath + '是否存在');
}
let webpackConfig = require('./config/webpack.config');
const config = require(commonApi.projectDir + '/config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");
const WebpackdevOutput = require('webpack-dev-server-output');

// react-lite不支持add-ons,性能测试的时候就直接替换成react
webpackConfig.resolve.alias.react = 'react';
webpackConfig.resolve.alias['react-dom'] = 'react-dom';

// 设置本地接口代理
webpackConfig.devServer = config.proxy;
// 替换正则
webpackConfig.module.loaders.push({
    test: /\.js$/,
    loader: StringReplacePlugin.replace({
        replacements: [{
            pattern: /\/\/ import performance/ig,
            replacement: function (match, p1, offset, string) {
                return ";import Perf from 'react-addons-perf';window.Perf = Perf;"
            }
        }, {
            pattern: /\/\/ performance start/ig,
            replacement: function (match, p1, offset, string) {
                return ";Perf.start();"
            }
        }, {
            pattern: /\/\/ performance end/ig,
            replacement: function (match, p1, offset, string) {
                return ";Perf.stop();Perf.printInclusive(Perf.getLastMeasurements());"
            }
        }, {
            pattern: /\/\/ debug info/ig,
            replacement: function (match, p1, offset, string) {
                return ";console.log(BNJS.env.compVersion, BNJS.env.appVersion, BNJS.account.uid, window.sampleObj, window.sampleObj.renderTime - window.sampleObj.startTime);"
            }
        }]
    })
});
let plugins = webpackConfig.plugins;

// 字符串替换插件
plugins.unshift(new StringReplacePlugin());
// 文件产出工具
plugins.push(new WebpackdevOutput({
    path: commonApi.modulePath,
    isDel: false
}));
// 不默认打开的页面
let blackList = ['polyfill', 'vconsole', 'common'];
let openPageList = [];
Object.keys(webpackConfig.entry).map(function (item) {
    if (blackList.indexOf(item) === -1) {
        openPageList.push(item);
    }
});
let openPage = openPageList[0] || 'index';
openPage = path.join(commonApi.args.module, 'html', openPage);
plugins.push(new OpenBrowserPlugin({url: 'http://localhost:8081/' + openPage + '.html?need_bnjs=1'}))
module.exports = webpackConfig;
