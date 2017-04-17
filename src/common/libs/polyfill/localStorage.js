/**
 * @file polyfill hardware
 * @author  liyu(liyu09@baidu.com)
 */

import {emptyFunc} from './util';

const localStorage = global.localStorage;

function setItem(key, value, success = emptyFunc, failure = emptyFunc) {
    try {
        localStorage.setItem(key, value);
        success();
    }
    catch (err) {
        failure();
    }
}

function getItem(key, success = emptyFunc, failure = emptyFunc) {
    try {
        let data = localStorage.getItem(key);
        if (data) {
            success({
                data
            });
        } else {
            failure();
        }

    }
    catch (err) {
        console.error(err)
        failure();
    }
}

function removeItem(key, success = emptyFunc, failure = emptyFunc) {
    try {
        localStorage.removeItem(key);
        success();
    }
    catch (err) {
        failure();
    }
}

export default {
    setItem,
    getItem,
    removeItem
};
