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

function getData(callback) {
    callback({
        spType: 2,
        through_cid: 235,
        through_test: 'test'
    });
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
