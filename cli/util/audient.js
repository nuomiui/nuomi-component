/**
 * @file 动态生成监听文件变化
 * @author memoryza(wangjincai@baidu.com)
 * @dete  2016-09-22 15:29
 * @param dir 项目根目录
 * @param module 模块名称
 */
let os = require('os');
let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let config = require('../../config');
let {watch, readdir, readdirSync, readFileSync, existsSync, statSync} = fs;
let {join} = path;
// 不递归的文件夹
const excludeDir = ['node_modules', 'common', 'widget'];
// 页面标题匹配
const titlePattern = /@\w+\s+(.*)/;
// 参数匹配
const paramPattern = /\/\/[ ]{0,1}@params\s*([\w-_]+)\s*=\s*['"]*([-\w]+)['"]*/;
// 文件全局匹配
const globalPattern = new RegExp(paramPattern, 'g');
// 单参数匹配
const singlePattern = new RegExp(paramPattern, '');
let [_searchPage, _getPageList,
    _isForbidenProejct, _checkLocalProject,
    _getParams, _writePageJSON] = [Symbol('_searchPage'), Symbol('_getPageList'), Symbol('_isForbidenProejct'), Symbol('_checkLocalProject'), Symbol('_getParams'), Symbol('_writePageJSON')];
// 工程中全部项目目录
let pageList = {};
// 当前用户编译过的项目
let outputProjectList = [];
let isForbidenDir = (dirName) => {
    return excludeDir.indexOf(dirName) !== -1
        || dirName.indexOf('.') === 0
        || !dirName;
}
// 写入监听文件
function writePageJSON(list) {

}

const getLocalAddr = function() {
    let networkInterfaces = require("os").networkInterfaces();
    let matches = [];

    Object.keys(networkInterfaces).forEach(function (item) {
        networkInterfaces[item].forEach(function (address) {
            if (address.internal === false && address.family === "IPv4") {
                matches.push(address.address);
            }
        });
    });
    return matches;
}

class Watcher {
    constructor(option) {
        let a = +new Date();
        // 项目根目录
        this.projectDir = option.dir;
        // 源代码目录
        this.module = option.module;
        this.srcDir = join(option.dir, 'src');
        this.init();
        // 更改audient/index.js
        let entryAudient = path.join(this.projectDir, 'audient/js/index.js');
        let jsTemp =  fs.readFileSync(entryAudient, 'utf8');
        jsTemp = jsTemp.replace(/%webrootDir%/g, config.webserverRoot);
        // 存在以后就不copy，只输出(暂时注视掉)
        // if (!fs.existsSync(join(this.projectDir, 'output/audient'))) {
            let cpCommand = [
                'cp -R ',
                join(this.projectDir, 'audient'),
                join(this.projectDir, 'output')
            ];
            child_process.execSync(cpCommand.join(' '));
        // }
        fs.writeFileSync(path.join(this.projectDir, 'output/audient/js/index.js'), jsTemp);
        this[_writePageJSON](this.getJSON());
    }
    apply() {
        //webpack需要该方法
    }
    // 写入页面文件
    [_writePageJSON](list) {
        let json = {
            currentproject: this.module,
            ip: getLocalAddr()[0],
            list: list
        };
        let jsonStr = JSON.stringify(json, null, 4);
        if (os.platform() === 'win32') {
            jsonStr = jsonStr.replace(/\\\\/ig, '/');
        }
        fs.writeFileSync(path.join(this.projectDir, 'output/audient/pages.json'), jsonStr);
    }
    // 判断是不是没有编译过的项目
    [_isForbidenProejct](projectName) {
        return (projectName !== this.module) && outputProjectList.indexOf(projectName) === -1;
    }
    // 检测本地已经编译过的项目
    [_checkLocalProject]() {
        let outputDir = join(this.projectDir, 'output');
        if (existsSync(outputDir)) {
            let files = readdirSync(outputDir);
            files.forEach(item => {
                if (!isForbidenDir(item)) {
                    outputProjectList.push(item);
                }
            });
        }
    }
    [_getParams](filename, jsFileString) {
        let params = [];
        let matchArr = jsFileString.match(globalPattern);
        if (matchArr && matchArr.length) {
            matchArr.map(item => {
                let kv = item.match(singlePattern);
                params.push(`${kv[1]}=${kv[2]}`);
            })
        }
        return params.join('&');
    }
    [_searchPage](projectName, dir) {
        let self = this;
        let pageDir = join(dir, 'page');
        if (existsSync(pageDir)) {
            let files = readdirSync(pageDir);
            files.forEach(item => {
                if (!isForbidenDir(item)) {
                    let filename = join(pageDir, item, item + '.js');
                    if (existsSync(filename)) {
                        let jsFileString = readFileSync(filename, {encoding: 'utf8'});
                        let name = item;// 文件名
                        let matchArr = jsFileString.match(titlePattern);
                        if (Array.isArray(matchArr) && matchArr.length === 2) {
                            name = matchArr[1];
                        }
                        let qs = self[_getParams](filename, jsFileString);
                        pageList[projectName].push({
                            name: name,
                            url: join('/', projectName, 'html', item + '.html'),
                            qs: qs
                        });
                    }
                }
            });
        }
    }
    [_getPageList]() {
        let self = this;
        let files = readdirSync(this.srcDir);
        files.push(this.module)
        files.forEach(item => {
            if (!isForbidenDir(item)) {
                let subDir = join(this.srcDir, '/', item);
                let stats = statSync(subDir);
                if (stats.isDirectory()) {
                    pageList[item] = [];
                    // 本地没编译过的项目不搜集
                    if (!self[_isForbidenProejct](item)) {
                        self[_searchPage](item, subDir);
                    }
                }
            }
        })
    }
    // 更新json
    update() {
        this[_checkLocalProject]();
        this[_getPageList]();
        return this.getJSON();
    }
    getJSON() {
        return pageList;
    }
    init() {
        this[_checkLocalProject]();
        if(existsSync(this.srcDir)) {
            this[_getPageList]();
        } else {
            throw '没有找到监听目录哦~~~';
        }
    }
};
module.exports = Watcher;
