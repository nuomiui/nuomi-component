/**
 * @file polyfill ui index
 * @author liyu(liyu09@baidu.com)
 */

import {query, appendHtml} from '../util';
import actionSheet from './actionSheet';
import dialog from './dialog';
import title from './title';
import toast from './toast';


const errTypeMap = {
    9011: '网络错误',
    9012: '无券',
    9013: '无订单',
    9014: '无团单',
    9015: '其它'
};
const loadingText = '正在加载中...';
let isShowPage = true;
let isShowReload = false;
let html = `
<div id="bnjs-loading-page"
    style="position:absolute;
    top:0; left:0; bottom:0;
    right:0;
    background:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-flow:column"
>
    <h2 style="display:none">错误类型</h2>
    <p>${loadingText}</p>
    <div class="reload" style="display:none"><a href="javascript:window.location.reload();">重新加载</a></div>
</div>
`;
if (window.location.search.match(/need_bnjs/)) {
    appendHtml(html);
    var elContainer = query('#bnjs-loading-page');
    var elText = query('p', elContainer);
    var elReload = query('.reload', elContainer);
    var elErrorType = query('h2', elContainer);
}
function showReload() {
    if (!isShowReload) {
        elReload.style.display = 'block';
        isShowReload = true;
    }
}

function hideReload() {
    if (isShowReload) {
        elReload.style.display = 'none';
        isShowReload = false;
    }
}

function showPage() {
    if (!isShowPage) {
        elContainer.style.display = 'block';
        isShowPage = true;
    }
}

function hidePage() {
    if (isShowPage) {
        elContainer.style.display = 'none';
        isShowPage = false;
    }
}

function showLoadingPage() {
    elText.innerHTML = loadingText;
    showPage();
}

function hideLoadingPage() {
    elText.innerHTML = loadingText;
    hidePage();
}

function showErrorPage(text = '页面出错', flag = 0, type) {
    elText.innerHTML = text;
    if (flag === 1) {
        showReload();
    }
    if (type && type in errTypeMap) {
        elErrorType.style.display = 'block';
        elErrorType.innerHTML = errTypeMap[type];
    }
}

function hideErrorPage() {
    elErrorType.style.display = 'none';
    hideReload();
    hidePage();
}

function nativeInterfere() {}

function closePullAction() {}

function hasBanner() {}

function copyText() {}

function toggleBtnBack() {}

function share() {}

export default {
    actionSheet,
    dialog,
    title,
    toast,
    showErrorPage,
    showLoadingPage,
    hideErrorPage,
    hideLoadingPage,
    nativeInterfere,
    closePullAction,
    hasBanner,
    copyText,
    toggleBtnBack,
    share
};
