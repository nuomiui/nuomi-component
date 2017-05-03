/**
 * @file 这里统一处理 注入js的注入条件判断
 * @description  为什么不写在common里？
 *               答：如果只有两个工具注入很简单写进去，但是以后有其他工具怎么办？单文件逻辑只会越来越负责，代码越来越多，更不可维护
 * @author memoryza(jincai.wang@foxmail.com)
 * @return {object}
 */
const path = require('path');
let cli = process.argv[1];
let cliArr = cli.split(path.sep);
let cliName = cliArr[cliArr.length - 1];
module.exports = {
    // 是否需要注入console调试工具，env当前执行环境
    isNeedDebugTools: function (env) {
        const notNeedConsole = ['create', 'project', 'rd'];
        // rd开发机器不需要调试工具
        if (notNeedConsole.indexOf(cliName) >= 0) {
            return false;
        }
        // dev/performance和release --e 不为pro 的情况都需要调试工具
        if (cliName.match(/webpack-dev-server/)
             || env !== 'pro') {
            return true;
        }
        return false;
    },
    // 是否需要BNJS-polyfill注入
    isNeedpolyfill: function (env) {
        if (cliName.match(/webpack-dev-server/)) {
            return true;
        }
        // 发布到RD开发机
        if (env === 'rd') {
            return true
        }
        if (cliName.match(/webpack/) || env === 'pro') {
            return false;
        }
        return true;
    },
    // 判断是那种环境
    assignEnv: function (args, env) {
        // 开发环境请求全部走config.js做代理转向
        if (cliName.match(/webpack-dev-server/)) {
            return false;
        }
        // release发包环境才确定请求那个host的APIs
        if (cliName.match(/webpack/)) {
            return args.env === env;
        }
        return false;
    }
}
