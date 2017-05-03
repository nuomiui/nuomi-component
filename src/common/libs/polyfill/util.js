/**
 * @file polyfill util
 * @author liyu(liyu09@baidu.com)
 */

let emptyFunc = function () {};
const query = (...args) => document.querySelector.call(document, ...args);
const appendHtml = (html) => document.body.insertAdjacentHTML('beforeend', html);

function throwIfMissing(name) {
    throw new Error('Missing Parameter ' + name);
}

function encodeUrlParam(data) {
    let res = [];
    Object.keys(data).forEach((key) => {
        let item;
        if (data[key] === undefined) {
            return;
        }
        if (typeof data[key] === 'object') {
            item = JSON.stringify(data[key]);
        }
        else {
            item = data[key];
        }
        res.push(key + '=' + encodeURIComponent(item));
    });
    return res.join('&');
}

function one(ele, strs, cb) {
    let arr = strs.split(' ');
    function removeListener() {
        arr.forEach(function (name) {
            ele.removeEventListener(name, callback);
        });
    }
    function callback() {
        removeListener();
        return cb && cb();
    }
    arr.forEach(function (name) {
        ele.addEventListener(name, callback);
    });
}

export {
    throwIfMissing,
    emptyFunc,
    encodeUrlParam,
    query,
    appendHtml,
    one
};
