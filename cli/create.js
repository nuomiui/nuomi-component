/**
 * @file 自动生成page/widget页面
 * @desc 自动生成page或是widget页面, pagename: 页面name格式a-b; -w 确定是否是生成widget的子模块, -d pagename描述 -a 作者信息
 * @author memoryza（wangjincai@baidu.com)
 * @shell npm run create [项目名称] [页面名称] [描述] [page/widget]
 */
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var domain = require('domain');
var commonApi = require('./util/common');
var args = commonApi.args;
var userName = child_process.execSync('git config user.name').toString('utf8');
var email = child_process.execSync('git config user.email').toString('utf8');
args.a = userName.trim() + '(' + email.trim() + ')';
function getCamelCase(param) {
    if (!param) {
        return;
    }
    var name = '';
    var arr = param.split('-');
    for (var i = 0, _len = arr.length; i < _len; i++) {
        if (i === 0) {
            name += arr[i];
        } else {
            name += arr[i].charAt(0).toUpperCase() + arr[i].substr(1);
        }
    }
    return name;
}

var pagename = args.p;
if (!pagename) {
    return commonApi.onError({message: 'npm run create --modules=模块名称 --page=页面名 --widget=是否是widget'});
}
var moduleName = args.w == 'page' ? 'page' : 'widget/snippet';
var pagePath = path.join(commonApi.srcPath, moduleName, pagename);
if (fs.existsSync(pagePath)) {
    return commonApi.onError({message: '参数信息错误: ' + pagename + '在项目目录中存在'});
}
function getJsContent() {
    var fn = 'util/template/page.js';
    if (moduleName !== 'page') {
        fn = 'util/template/snippet.js';
    }
    var jsTemp = fs.readFileSync(path.join(__dirname , fn), 'utf8');
    return jsTemp.replace(/%pagename%/g, pagename)
        .replace(/%logName%/g, pagename.replace('-','_'))
        .replace(/%description%/g, function() {
            return args.d ? args.d : '';
        })
        .replace(/%author%/g, function() {
            return args.a ? args.a : '';
        })
        .replace(/%widgetName%/g, function () {
            var widgetName = getCamelCase(pagename);
            return widgetName.charAt(0).toUpperCase() + widgetName.substr(1);
        })
        .replace(/%dateTime%/g, commonApi.getYmdHms());
}

try {
    // 创建目录及文件
    var snippet  = path.join(commonApi.srcPath, moduleName);
    if (!fs.existsSync(snippet)) {
        fs.mkdirSync(snippet);
    }
    var filename = pagename;
    if (moduleName !== 'page') {
        filename = 'index';
    }
    fs.writeFileSync(path.join(pagePath, filename + '.less'), '');
    fs.writeFileSync(path.join(pagePath, filename + '.js'), getJsContent());
} catch (e) {
    return commonApi.onError({message: e.message});
}
