/**
 * @file 组件化配置文件，确认页面是否需要用户登陆
 * @author memoryza(wangjincai@baidu.com)
 */

var fs = require('fs');
var path = require('path');
var needLogin = [];

module.exports = function (srcPath) {
    return fs.readdirSync(path.join(srcPath, 'page'))
      .filter(function (page) {
         return page !== 'common' && page.indexOf('.') !== 0;
      })
      .map(function (page) {
        return {
            name: page,
            file: ['/html/', page, '.html'].join(''),
            login: needLogin.indexOf(page) >= 0
        };
    });
};
