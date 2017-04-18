/**
 * @file webpack输出后，直接调用FIS3将代码发布到rd开发机上
 * @author memoryza(jincai.wang@foxmail.com)
 */
const commonApi = require('./util/common');
const fs = require('fs');
if (!fs.existsSync(commonApi.srcPath)) {
    commonApi.onError('项目' + commonApi.args.module +  '不存在，请检查' + commonApi.srcPath + '是否存在');
}
let webpackConfig = require('./config/webpack.config');
const WebpackFISDeploy = require('./util/fisdeploy');
// fis-deploy插件
webpackConfig.plugins.push(new WebpackFISDeploy());
module.exports = webpackConfig;

