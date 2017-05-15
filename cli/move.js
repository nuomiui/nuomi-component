/**
 * @file 用于fuxi项目旧代码迁移
 * @author memoryza(jincai.wang@foxmail.com)
 */
let path = require('path');
let fs = require('fs');
let exec = require('child_process').exec;
let execSync = require('child_process').execSync;

let commonApi = require('./util/common');

if (!fs.existsSync(commonApi.srcPath)) {
    commonApi.onError('项目' + commonApi.args.module +  '不存在，请检查' + commonApi.srcPath + '是否存在');
}
// 删除tpl
let rmTplCommand = [
    'rm -rf ' + path.join(commonApi.srcPath, 'widget/entry') + ' && ',
    'rm -rf ' + path.join(commonApi.srcPath, 'widget/head') + ' && ',
    'rm ' + path.join(commonApi.srcPath, 'page/**/*.tpl')
];
try {
    execSync(rmTplCommand.join(' '));
} catch(e){}

// 复制config.js
execSync('cp ' + path.join(commonApi.cliPath, 'util/project_init/config.js') + ' ' + path.join(commonApi.srcPath, 'config.js'))

// 替换渲染容器
let renderIdPattern = /document\.getElementById\([\'\"]{0,1}[\w-]+[\'\"]{0,1}\)/;
let pageDir = path.join(commonApi.srcPath, 'page');
fs.readdirSync(pageDir).filter(function (page) {
     return page !== 'common' && page.indexOf('.') !== 0;
}).map(function (pageName) {
    let jsFileName = path.join(pageDir, pageName, pageName + '.js');
    let content = fs.readFileSync(jsFileName, {encoding: 'utf8'});
    let newContent = content.replace(renderIdPattern, function (item) {
        return "document.getElementById('wrapContainer')";
    });
    fs.writeFileSync(jsFileName, newContent, {encoding: 'utf8'});
});
