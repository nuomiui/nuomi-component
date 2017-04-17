/**
 * @file npm run dev 本地调试
 * @author memoryza(wangjincai@baidu.com)
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
const WebpackAudientPlugin = require('./util/audient');
const WebpackdevOutput = require('webpack-dev-server-output');

// 设置本地接口代理
webpackConfig.devServer = config.proxy;
// 加入插件
let plugins = webpackConfig.plugins;

let openPage;
// 倾听者
if (config.audient) {
    plugins.push(new WebpackAudientPlugin({
        dir: commonApi.projectDir,
        module: commonApi.args.module
    }));
    openPage = 'audient/index';
} else {
    // 不默认打开的页面
    let blackList = ['polyfill', 'vconsole', 'common'];
    let openPageList = [];
    Object.keys(webpackConfig.entry).map(function (item) {
        if (blackList.indexOf(item) === -1) {
            openPageList.push(item);
        }
    });
    openPage = openPageList[0] || 'index';
    openPage = path.join(commonApi.args.module, 'html', openPage);
}
// 文件产出工具
plugins.push(new WebpackdevOutput({
    path: commonApi.modulePath,
    isDel: true
}));
plugins.push(new OpenBrowserPlugin({url: 'http://localhost:8081/' + openPage + '.html?need_bnjs=1'}));

module.exports = webpackConfig;
