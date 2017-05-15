/**
 * @file polyfill http
 * @author  liyu(liyu09@baidu.com)
 */
import 'whatwg-fetch';

import {throwIfMissing, emptyFunc, encodeUrlParam} from './util';

function get({
    url = throwIfMissing('url'),
    params = {},
    headers,
    onSuccess = emptyFunc,
    onFail = emptyFunc
} = {}) {
    // 处理url参数
    let sepIndex = url.indexOf('?');
    let urlParams = encodeUrlParam(params);
    if (urlParams) {
        if (sepIndex !== -1) {
            if (sepIndex === url.length - 1) {
                url += urlParams;
            }
            else if (url[url.length - 1] === '&') {
                url += urlParams;
            }
            else {
                url += '&' + urlParams;
            }
        }
        else {
            url += '?' + urlParams;
        }
    }

    fetch(url, {
        headers
    })
    .then(res => res.json())
    .then(onSuccess, onFail);
}

function post({
    url = throwIfMissing('url'),
    params = {},
    headers = {},
    onSuccess = emptyFunc,
    onFail = emptyFunc
} = {}) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    fetch(url, {
        method: 'POST',
        headers,
        body: encodeUrlParam(params)
    })
    .then(res => res.json())
    .then(onSuccess, onFail);
}

function sign() {
}

function getNA(options) {
    // 扩展参数
    options.params.timestamp = +new Date();
    get(options);
}

function postNA(options) {
    post(options);
}

function getCatgData() {
}

export default {
    get,
    post,
    sign,
    getNA,
    postNA,
    getCatgData
};
