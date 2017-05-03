/**
 * @file polyfill account
 * @author  liyu(liyu09@baidu.com)
 */
import {encodeUrlParam, emptyFunc} from './util';

const loginUrl = 'http://m.nuomi.com/webapp/user/login';
const userPhone = '138******41';

function login() {
    const params = {
        backUrl: global.location.href,
        sms: 1
    };
    global.location.href = loginUrl + '?' + encodeUrlParam(params);
}

function getMobile({
    type = 1,
    onSuccess = emptyFunc,
    onFail = emptyFunc
} = {}) {
    if (Math.random() > 0.9) {
        onSuccess({
            mobile: userPhone
        });
    }
    else {
        const errMap = {
            1003: '帐号未登录',
            1004: '帐号失效',
            1005: '网络异常',
            1006: '手机号类型不存在',
            1007: '获取失败'
        };
        const keys = errMap.keys();
        const i = parseInt(Math.random() * keys.length, 10);
        onFail({
            errno: keys[i],
            errmsg: errMap[keys[i]]
        });
    }
}

function getSecretAccount() {
}

function getCommonSecretAccount() {
}

function getDpassWithMobile() {
}

function refreshCaptchaImage() {
}

function loginWithMobile() {
}

export default {
    isLogin: true,
    uid: '123',
    uName: 'wanger',
    displayName: '王二',
    bduss: 'jRqbzRhRkNHaFhqTm80N0JJVVRIdWxlRHotMHAtSm44NFZHU3BuaFNHblZXR0ZXQVFBQUFB'
    + 'JCQAAAAAAAAAAAEAAADpNiGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANXLOVbVyzlWe',
    login,
    getMobile,
    getSecretAccount,
    getCommonSecretAccount,
    getDpassWithMobile,
    refreshCaptchaImage,
    loginWithMobile
};
