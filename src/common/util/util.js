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
const compareBNJSVerion = function (version) {
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
    let query = [];
    for (let i in params) {
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
// 非糯米NA端都认为是wap,比如渠道是手百之类的，因为不是所有组件都上到其他渠道，对应跳转来说目的地不明确
let isWap = () => {
    // 糯米渠道名称
    if (BNJS.env.packageName == 'com.nuomi'
        || BNJS.env.packageName == 'com.renren-inc.nuomi'
        || BNJS.env.packageName == 'com.baidu.nuomi.qa.BaiduNuomiTuan') {
        return BNJS.env.appName === 'bainuo-wap';
    }
    // 非糯米渠道的全部走wap
    return true;
};
let getChannel = () => {
    if (BNJS.env.packageName === 'com.nuomi'
        || BNJS.env.packageName === 'com.renren-inc.nuomi'
        || BNJS.env.packageName === 'com.baidu.nuomi.qa.BaiduNuomiTuan') {
        return 'nuomi';
    } else if (BNJS.env.packageName === 'com.baidu.BaiduBoxDev'
        || BNJS.env.packageName === 'com.baidu.BaiduMobile'
        || BNJS.env.packageName === 'com.baidu.BaiduMobile.dcps'
        || BNJS.env.packageName === 'com.nuomi.dcps.plugin'
        || BNJS.env.packageName === 'com.baidu.searchbox'){
        return 'shoubai';
    } else if (BNJS.env.appName === 'bainuo-wap' && BNJS.env.packageName === 'com.nuomi') {
        return 'wap';
    }
    return 'wap';
}
let fileReader = (file, callback) => {
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function (e) {
        callback(this.result);
        fr = null;
    };
};
let blobToDataUrl = (blob, callback) => {
    let a = new FileReader();
    a.onload = function (e) {
        callback(e.target.result);
    };
    a.readAsDataURL(blob);
};
let waptitle = (title) => {
    if (isWap()) {
        setTimeout(function(){
            document.title = title;
            let iframe = document.createElement('iframe');
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
const inView = (element, threshold) => {
    if (!element) {
        return false;
    }
    let viewTop = 0;
    let viewBottom = window.innerHeight;

    let boundingRect = element.getBoundingClientRect();
    let elemTop = boundingRect.top - threshold;
    let elemBottom = boundingRect.top + Math.round(boundingRect.height) + threshold;

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
    let viewTop = 0;
    let viewBottom = window.innerHeight;

    let boundingRect = element.getBoundingClientRect();
    let elemTop = boundingRect.top - threshold;
    let elemBottom = boundingRect.top + Math.round(boundingRect.height) + threshold;

    return viewTop <= elemTop && elemBottom <= viewBottom;
};
/*
* 用于版本控制时，比较app版本
* @param {string} version1 当前的app版本【BNJS.env.appVersion】
* @param {string} version2 界限app版本
* @return {number} 0：相等  1：当前app版本大于界限app版本  -1：当前app版本小于界限app版本
* */
const versionCompare = (version1, version2)=> {
    let arr1 = version1.split('.'),
        arr2 = version2.split('.');
    let maxLength = Math.max(arr1.length, arr2.length);
    let r, i1, i2;
    for (let i = 0; i < maxLength; i++) {
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
const formatUrl = (url, params) => {
    params = params && Object.keys(params).map(function (key) {
        return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');

    return params
        ? url + (url.indexOf('?') >= 0 ? '&' : '?') + params
        : url;
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
/*
* 接入第三方，wap环境下需将h5链接加百糯协议，保证在框架内运行不跳出
* @param {string} 需要格式化的落地页链接
* @return {string} 格式化后的可用链接
* 说明：手百环境下packageName的值：ios下('com.baidu.BaiduBoxDev', 'com.baidu.BaiduMobile', 'com.baidu.BaiduMobile.dcps'),android下('com.nuomi.dcps.plugin', 'com.baidu.searchbox')
* */
const effectiveUrl = (url) => {
    if(isWap()){
        !(/^bainuo:\/\//.test(url)) && (url = 'bainuo://component?url='+encodeURIComponent(url));
    }
    return url;
}
//点击特效
const addClickEffect = (evt) =>{
    let id = evt.currentTarget;
    let arc = '<div id="arc" class="arc"></div>';

    let startX = 0,
        startY = 0;

    let click  = ()=> {
        $(id).append(arc);
        let px = $(id).offset().left;
        let py = $(id).offset().top;
        let w = parseInt($(id).width(), 10);
        let h = parseInt($(id).height(), 10);
        startX = Number(evt.pageX);
        startY = Number(evt.pageY);
        let x = Number(evt.pageX);
        let y = Number(evt.pageY);
        let fx = px + w;
        let fy = py + h;
        let x1 = x - px;
        let x2 = fx - x;
        let y1 = y - py;
        let y2 = fy - y;
        // let x1 = (x - px) >= (fx -x) ? (x - px) : (fx - x);
        // let y1 = (y - py) >= (fy -y) ? (y - py) : (fy - y);
        let x3 = x1 > x2 ? x1 : x2;
        let y3 = y1 > y2 ? y1 : y2;
        // let max  = x1 >= y1 ? x1 : y1;
        let max = Math.sqrt(x3*x3 + y3*y3);
        let left  = x - px - max;
        let top = y - py - max;
        $('#arc').css({'left': left, 'top': top, 'width': max*2.1, 'height': max*2.1});
        $('#arc').addClass('pulse');
        setTimeout(() =>{
            $('#arc').remove();
        }, 250);
    }
    let move = (e)=>{
        let touch = e.touches[0]; //获取第一个触点
        let x = Number(touch.pageX); //页面触点X坐标
        let y = Number(touch.pageY); //页面触点Y坐标
            //判断滑动方向
        if (y != startY || x != startX) {
            $('#arc').remove();
        }
    };
    click();
    $(id)[0].addEventListener('touchmove', move, false);
}
const cssSupports = (function() {
    var div = document.createElement('div'),
        vendors = 'Khtml O Moz Webkit'.split(' '),
        len = vendors.length;
    return function(prop) {
        if ( prop in div.style ) return true;
        if ('-ms-' + prop in div.style) return true;

        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });

        while(len--) {
            if ( vendors[len] + prop in div.style ) {
            return true;
        }
    }
        return false;
    };
})();

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
    formatUrl: formatUrl,
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
    versionCompare: versionCompare,
    blobToDataUrl: blobToDataUrl,
    fileReader: fileReader,
    effectiveUrl: effectiveUrl,
    getChannel: getChannel,
    addClickEffect: addClickEffect,
    cssSupports: cssSupports
};
