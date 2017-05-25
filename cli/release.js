/**
 * @file npm run release 压缩
 * @author memoryza(wangjincai@baidu.com)
 */
const path = require('path');
const webpack = require('webpack');
const WebpackDelPlugin = require('webpack-del-plugin');
const WebpackZipPlugin = require('zip-webpack-plugin');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rimraf = require('rimraf');

const commonApi = require('./util/common');
const WebpackGenerateConfig = require('./util/generateconfig');
const StringReplacePlugin = require("string-replace-webpack-plugin");
let webpackConfig = require('./config/webpack.config');
let plugins = webpackConfig.plugins;
// 替换正则
if (!commonApi.isPro) {
    // 当--e!=pro 时自动打印调试信息增加调试信息
    webpackConfig.module.loaders.push({
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
            replacements: [{
                pattern: /\/\/ debug info/ig,
                replacement: function (match, p1, offset, string) {
                    return ";console.log(BNJS.env.compVersion, BNJS.env.appVersion, BNJS.account.uid, window.sampleObj, window.sampleObj.renderTime - window.sampleObj.startTime);"
                }
            }]
        })
    });
    // 当--e!=pro 时自动打印调试信息增加调试信息
    plugins.unshift(new StringReplacePlugin());
}
//release 文件产出到release 文件夹
webpackConfig.output.path = commonApi.releaseModulePath;

plugins.unshift(new webpack.NoEmitOnErrorsPlugin());

// 压缩js
plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {comments: false}
}));
// 压缩css
plugins.push(new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: cssnano,
  cssProcessorOptions: { discardComments: {removeAll: true }, safe: true},
  canPrint: true
}));
// 添加config.json
plugins.push(new WebpackGenerateConfig());
// 打包
plugins.push(new WebpackZipPlugin({
    path: commonApi.releasePath,
    filename: commonApi.args.module + '_' +  commonApi.args.env +'.zip'
}));
// 删除缓存文件
plugins.push(function () {
    this.plugin("done", function(compilation, callback) {
      rimraf.sync(commonApi.releaseModulePath);
  });
});
module.exports = webpackConfig;
