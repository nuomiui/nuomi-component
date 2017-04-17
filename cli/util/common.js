/**
 * @file 公用的参数集合
 * @author memoryza(wangjincai@baidu.com)
 */
var path = require('path');
var fs = require('fs');
var notifier = require('node-notifier');
var colors = require('colors');
var tools = require('./tool');
var env = process.env;
var args = {
    module: env.npm_config_module, // 项目模块
    env: env.npm_config_env || env.npm_config_e || 'pro', // 指定环境
    d: env.npm_config_filedesc || '这家伙很懒没有留下描述', // 指定文件描述
    w: env.npm_config_w || env.npm_config_widget || 'page', // 指定生成的是page还是widget
    p: env.npm_config_page,// 指定页面名称
    polyfill: env.polyfill === 0 ? 0 : 1
};
if (!args.module) {
    console.log('Error: 请输入需要构建的模块名称, npm run [dev|rd|create] --module=[模块名]'.red);
    notifier.notify({
        title: '构建出错',
        message: '缺少需要构建的模块名称'
    });
    process.exit(0);
}
// 如果是发布到rd开发机器，请求路径不加+host
if (env.npm_lifecycle_script &&env.npm_lifecycle_script.match(/\/rd\.js$/)) {
    args.env = 'rd';
}

// 获取据对路径
var abs = function (p) {
    return path.join(__dirname, '../../', p);
};

// todo 静态资源上传cdn路径
var cdnPath = './';
// 获取cdn路径
var getCDNPath = function () {
    if (tools.assignEnv('dev')) {
        return './';
    } else {
        return cdnPath;
    }
};
var onError = function (err) {
    console.log('Error:'.red, err.message || err);
    notifier.notify({
        title: '构建出错',
        message: err.message || err
    });
    process.exit(0);
};

var getYmdHms = function () {
    var time = new Date();
    return time.getFullYear()
        + '-' + (time.getMonth() + 1)
        + '-' + (time.getDate())
        + ' ' + (time.getHours())
        + ':' + (time.getMinutes())
        + ':' + (time.getSeconds());
};

var commonAPI = {
    args: args,
    // 模块源代码目录
    srcPath: path.join(abs('src'), args.module),
    // 项目开发目录
    outputPath: abs('output'),
    // 模块目录
    modulePath: path.join(abs('output'), args.module),
    // 项目产出目录
    releasePath: abs('release'),
    // cli目录
    cliPath: abs('cli'),
    // 全局公共工具、组件目录
    commonPath: path.join(abs('src'), 'common'),
    // 依赖库
    depPath: path.join(abs('src'), 'common', 'libs'),
    // mock目录
    mockPath: path.join(abs('mock')),
    // todo有H5上cdn会用到
    assetsPath: getCDNPath(),
    pageFolder: 'page',
    pkg: abs('package.json'),
    isDev: tools.assignEnv(args, 'dev'),
    isQa: tools.assignEnv(args, 'qa'),
    isPro: tools.assignEnv(args, 'pro'),
    abs: abs,
    onError: onError,
    getYmdHms: getYmdHms,
    // 文件监听目录
    watchFileDir: abs('src'),
    // 网站根目录
    rootDir: abs('../'),
    // 项目根目录
    projectDir: abs(''),
    // 是否需要调试工具
    debugTool: tools.isNeedDebugTools(args.env),
    // 是否需要polyfill(bnjs) 注入
    polyfill: tools.isNeedpolyfill(args.env, args.polyfill)
};

// 自动创建输出目录
if (!fs.existsSync(commonAPI.outputPath)) {
    fs.mkdirSync(commonAPI.outputPath, 0777);
}
if (!fs.existsSync(commonAPI.releasePath)) {
    fs.mkdirSync(commonAPI.releasePath, 0777);
}
module.exports = commonAPI;
