/**
 * @file 项目初始化脚本,新建组件可以执行 npm run  createproject 项目名称
 * @description 1、需要/克隆本地项目
 *              2、需要本地有git命令支持
 * @author memoryza(wangjincai@baidu.com)
 */

var fs = require('fs');
var path = require('path');
var commonApi = require('./util/common');
var exec =  require('child_process').exec;

var projectName = commonApi.args.module;
if (!projectName) {
    commonApi.onError({message: '参数信息错误: npm run project --m=项目名称'});
}

function createProject() {
    var isExistFloder = fs.existsSync(commonApi.srcPath);
    if (isExistFloder) {
        commonApi.onError({message: '项目已经存在'});
    } else {
        fs.mkdirSync(commonApi.srcPath, 0777);
        Clone();
    }
}
function Clone() {
    console.log('开始克隆');
    exec('cd ' + path.join(commonApi.cliPath, 'util') + ' && pwd && cp -R ./project_init/*  ' + commonApi.srcPath, function (err, stdout, stderr) {
        if (err) commonApi.onError({message: '切换到临时目录报错' + err});
        console.log('克隆完成');
    });
}
createProject();
