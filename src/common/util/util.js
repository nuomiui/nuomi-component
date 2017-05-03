/**
 * @file 工具类
 * @author memoryza<wangjincai@baidu.com>
 */
import log from './log';
let util = {};
let readyCallback = [];
let ready = (callback) => {
    if (typeof callback !== 'function') {
        return;
    }
    if (window.BNJS && window.BNJS._isAllReady) {
        return callback(window.BNJS);
    }
    else {
        readyCallback.push(callback);
        document.addEventListener('BNJSReady', () => {
            while (readyCallback.length > 0) {
                readyCallback.shift()(window.BNJS);
            }
        }, false);
    }
};
const doNothing = () => {};
const type = (o) => {
    return Object.prototype.toString.call(o);
};
const forEach = (obj, method) => {
    if (type(obj) === '[object Array]') {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (method.call(this, obj[i], i) === false) {
                break;
            }
        }
        return;
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && method.call(this, obj[key], key) === false) {
            return;
        }
    }
};
const transform = (obj, method) => {
    if (!obj) {
        return obj;
    }

    let target = new obj.constructor();
    forEach(obj, (val, key) => {
        method(target, val, key);
    });
    return target;
};

const map = (obj, method) => {
    return transform(obj, (target, val, key) => {
        target[key] = method ? method(val, key) : val;
    });
};

const filter = (obj, method) => {
    return transform(obj, (target, val, key) => {
        if (method(val, key)) {
            target[key] = val;
        }
    });
};

const clone = map;

const extend = (target, addon, alone) => {
    target = (alone ? clone(target) : target) || {};
    forEach(addon, (val, key) => {
        target[key] = val;
    });
    return target;
};
/**
 * Generate formatted text (by variable substitution)
 * 注意：这个不是模板引擎！不要用这个生成HTML代码！
 *
 * @param {string} template, template text ('a${x}c')
 * @param {Object} vars, vatiables ({x:'b'})
 * @return {string} formatted text ('abc')
 */
const format = (template, vars) => {
    return template.replace(/\$\{([^\{\}]*)\}/g, (_, name) => {
        let value = vars[name.trim()];
        return value == null ? '' : value + '';
    });
};
const toLen = (source, len) => {
    return (Array.prototype.join.call({
        length: len + 1
    }, '0') + source).slice(-len);
};

/**
 * Format date
 *
 * @param {string} template, template text ('$Y-$M-$d $H:$m:$s')
 * @param {Date|number|string=} date, the given date (use now as default)
 * @return {string} formatted text ('2015-06-24 13:52:31')
 */
const formatDate = (template, date) => {
    template = template.replace(/\$([a-zA-Z])/g, (_, key) => {
        return '${' + key + '}';
    });
    date = new Date(date || Date.now());
    let DAY = [ '日', '一', '二', '三', '四', '五', '六'];
    return format(template, {
        Y: toLen(date.getFullYear(), 4),
        y: toLen(date.getFullYear(), 2),
        M: toLen(date.getMonth() + 1, 2),
        D: DAY[date.getDay()],
        d: toLen(date.getDate(), 2),
        H: toLen(date.getHours(), 2),
        m: toLen(date.getMinutes(), 2),
        s: toLen(date.getSeconds(), 2)
    });
};
const isObject = (obj) => {
    return type(obj) === '[object Object]';
};

const isArray = function (obj) {
    return type(obj) === '[object Array]';
};
/**
 * 获取一个月中有几天
 *
 * @param {number} year YYYY年份
 * @param {number} month MM月份
 * @return {number} 天数
 */
const getDayInMonth = (year, month) => {
    let day = 0;
    month = parseInt(month, 10);
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            day = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            day = 30;
            break;
        case 2:
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                day = 29;
            }
            else {
                day = 28;
            }
    }
    return day;
};
/**
 * APP版本比较
 *
 * @param    {[type]}  version1 待比较版本
 * @return   {[type]}  boolean
 */
const compareVerion = (version) => {
    if (version) {
        let appVersionList = BNJS.env.appVersion.split('.');
        let versionList = version.split('.');
        if (appVersionList.length < 3) appVersionList.push(0);
        if (versionList.length < 3) versionList.push(0);
        if ((appVersionList[0] > versionList[0])
            || (appVersionList[0] == versionList[0]
                && appVersionList[1] > versionList[1])
            || (appVersionList[0] == versionList[0]
                && appVersionList[1] == versionList[1]
                && appVersionList[2] >= versionList[2])) {
                return true;
        }
    }
    return false;
};
// 是否小于某版本
const ltVersion = (version) => {
    return !compareVerion(version);
}
// 是否支持通栏功能
const canSupportNav = () => {
    return compareVerion('6.7.2');
}
/**
 * BNJS版本比较
 *
 * @param    {[type]}   version1 待比较版本
 * @return   {[type]}   boolean
 */
var compareBNJSVerion = function (version) {
    if (version) {
        let bnjsVersionList = BNJS.version.split('.');
        let versionList = version.split('.');
        if (bnjsVersionList.length < 2) bnjsVersionList.push(0);
        if (versionList.length < 2) versionList.push(0);
        if ((bnjsVersionList[0] > versionList[0])
            || (bnjsVersionList[0] == versionList[0]
                && bnjsVersionList[1] >= versionList[1])) {
                return true;
        }
    }
    return false;
};
const getParams = (search) => {
    let kv = {};
    let params = search.split('&');
    for(let i = 0; i< params.length; i++) {
        let s = params[i].split('=');
        if (params && s) {
            kv[s[0]] = decodeURIComponent(s[1]);
        }
    }
    return kv;
}
const getQueryStr = (params) => {
    var query = [];
    for (var i in params) {
        if (i && params.hasOwnProperty(i)) {
            query.push(i + '=' + encodeURIComponent(params[i]));
        }
    }
    return query.join('&');
}
/**
 * 根据给定的正则判断是否想跳转url地址里扩充参数
 *
 * @param    {string} url     跳转地址
 * @param    {object} params  参数地址
 * @return   {string} url
 */
const getExtendUrl = (url, params) => {
    let pattern = /url=.*/;
    if (url.match(/^http[s]?:\/\//)) {
        url += (url.indexOf('?') > 0 ? '&' : '?') + getQueryStr(params);
    }
    else if (url.match(pattern)) {
        let protocol = url.split('?')[0];
        let qs = url.split('?')[1];
        if (qs) {
            let paramsObj = getParams(qs);
            if (paramsObj.url) {
                paramsObj.url += (paramsObj.url.indexOf('?') > 0 ? '&' : '?') + getQueryStr(params);
            }
            url = protocol + '?' + getQueryStr(paramsObj);
        }
    }
    return url;
};
/**
 * 获取对象一层交集
 *
 * @param    {Object}  obj1 对象1
 * @param    {Object}  obj2 对象2
 * @return   {Object}
 */
const intersect = (obj1, obj2) => {
    let mergeObj = extend(obj1, obj2, 1);
    let intersectObj = {};
    for (let i in mergeObj) {
        if (i && obj1.hasOwnProperty(i)
            && obj2.hasOwnProperty(i)) {
            intersectObj[i] = obj2[i];
        }
    }
    return intersectObj;
}
const isAndroid = () => {
    return BNJS.device.platform.toLowerCase() === 'android';
};
const isIos = () => {
    return BNJS.device.platform.toLowerCase() === 'ios';
}
// 测试css3 特性支持
const featureTest = (property, value) => {
    let prop = property + ':';
    let style = document.createElement('div').style;
    style.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';
    return !!style[property] && !isAndroid();
};
let isWap = () => {
    return BNJS.env.appName === 'bainuo-wap';
};
let waptitle = (title) => {
    if (isWap()) {
        setTimeout(function(){
            document.title = title;
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.onload = function () {
                setTimeout(function () {
                    document.body.removeChild(iframe);
                }, 0);
            };
            document.body.appendChild(iframe);
        },0);
    }
};
// 获取缓存数据，返回promise对象
const getLS = (cacheKey, succFunc, failFunc) => {
    // 优先从缓存中拿数据
    BNJS.localStorage.getItem(cacheKey, (res) => {
        let lsData;
        try {
            lsData = JSON.parse(res.data);
        } catch(e) {}
        if (isObject(lsData) && parseInt(lsData.errno, 10) === 0
            && isObject(lsData.data)) {
            succFunc(lsData);
        } else {
            failFunc();
        }
    }, () => {
        failFunc();
    }, '2.7');
}
/**
 * 判断一个元素是否在视口中
 * @param  {Object} element   元素
 * @param  {number} threshold 阈值
 * @return {boolean}          是否在视口内
 */
var inView = (element, threshold) => {
    if (!element) {
        return false;
    }
    var viewTop = 0;
    var viewBottom = window.innerHeight;

    var boundingRect = element.getBoundingClientRect();
    var elemTop = boundingRect.top - threshold;
    var elemBottom = boundingRect.top + Math.round(boundingRect.height) + threshold;

    return (
            viewTop <= elemTop && elemTop <= viewBottom
        ) || (
            viewTop <= elemBottom && elemBottom <= viewBottom
        ) || (
            elemTop <= viewTop && elemBottom >= viewBottom
        );
};
// 全部在视口中
const inViewAll= (element, threshold) => {
    if (!element) {
        return false;
    }
    var viewTop = 0;
    var viewBottom = window.innerHeight;

    var boundingRect = element.getBoundingClientRect();
    var elemTop = boundingRect.top - threshold;
    var elemBottom = boundingRect.top + Math.round(boundingRect.height) + threshold;

    return viewTop <= elemTop && elemBottom <= viewBottom;
};
/*
* 用于版本控制时，比较app版本
* @param {string} version1 当前的app版本【BNJS.env.appVersion】
* @param {string} version2 界限app版本
* @return {number} 0：相等  1：当前app版本大于界限app版本  -1：当前app版本小于界限app版本
* */
const versionCompare = (version1, version2)=> {
    var arr1 = version1.split('.'),
        arr2 = version2.split('.');
    var maxLength = Math.max(arr1.length, arr2.length);
    var r, i1, i2;
    for (var i = 0; i < maxLength; i++) {
        i1 = typeof arr1[i] === 'undefined' ? 0 : +arr1[i];
        i2 = typeof arr2[i] === 'undefined' ? 0 : +arr2[i];
        if (i1 > i2) {
            r = 1;
        } else if (i1 == i2) {
            r = 0;
        } else if (i1 < i2) {
            r = -1;
        }
        if (r !== 0) {
            return r;
        }
    }
    return r;
};
// window.onerror = function (msg, url, line) {
//     if (url.match(/(\w+\-\w+)\./)) {
//         let model = {
//             pageName:url.match(/(\w+\-\w+)\./)[1],
//             msg:'页面js异常' + msg + ' at line:$msg$'
//         }
//         log.addException(model, line);
//     }
// }
module.exports = {
    doNothing: doNothing,
    type: type,
    forEach: forEach,
    transform: transform,
    map: map,
    filter: filter,
    clone: clone,
    extend: extend,
    format: format,
    toLen: toLen,
    formatDate: formatDate,
    ready: ready,
    isObject: isObject,
    isArray: isArray,
    addLog: log.addLog,
    // addException: log.addException,
    getDayInMonth: getDayInMonth,
    compareVerion: compareVerion,
    gtVersion: compareVerion,
    ltVersion: ltVersion,
    canSupportNav: canSupportNav,
    compareBNJSVerion: compareBNJSVerion,
    getExtendUrl: getExtendUrl,
    intersect: intersect,
    isAndroid: isAndroid,
    isIos: isIos,
    featureTest: featureTest,
    isWap: isWap,
    waptitle: waptitle,
    getLS: getLS,
    inView: inView,
    inViewAll: inViewAll,
    versionCompare: versionCompare
};
