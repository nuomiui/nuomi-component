/**
 * @file polyfill page
 * @author  liyu(liyu09@baidu.com)
 */

function start(url, params) {
    console.log(url, params);

    // ios 9.1 && nuomi-app 9.1，window.open(schema) 无法跳转
    location.href = url;
    // window.open(url);
}

function back() {
}

function setPageId() {
}

function getParams() {
    var search = location.search;
    var kv = {};
    if (search) {
        search = search.substr(1);
        var params = search.split('&');
        for(var i = 0; i < params.length; i++) {
            var s = params[i].split('=');
            if (params && s) {
                kv[s[0]] = decodeURIComponent(s[1]);
            }
        }
    }
    return kv;
}
function getData(callback) {
    callback(getParams());
}

function startPay() {
}

function registerReceiver() {
}

function unRegisterReceiver() {
}

function sendBroadcast() {
}

function startBind() {
}

function onBtnBackClick() {
}

function orderConfirm() {
}

function reShow() {
}

function leave() {
}

function enableBounce() {
}

function onCityChange() {
}

function onMessage() {
}

function postMessage() {
}

function getAlbum() {
}

function startPageforResult() {
}

function startCreditPay() {
}

export default {
    start,
    back,
    setPageId,
    getData,
    startPay,
    registerReceiver,
    unRegisterReceiver,
    sendBroadcast,
    startBind,
    onBtnBackClick,
    orderConfirm,
    reShow,
    leave,
    enableBounce,
    onCityChange,
    onMessage,
    postMessage,
    getAlbum,
    startPageforResult,
    startCreditPay
};
