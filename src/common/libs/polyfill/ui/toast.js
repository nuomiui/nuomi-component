/**
 * @file polyfill ui toast
 * @author  liyu(liyu09@baidu.com)
 */
import {query, appendHtml, one} from '../util';

const timeConfig = {
    0: 3000,
    1: 5000
};
let inited = false;
const html = `
<div id='bnjs-toast'
    style="
    position: absolute;
    bottom: 30%;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .4s ease;
    opacity: 0;
    ">
    <div style="
        background:rgba(0,0,0,.8);
        border-radius:6px;
        padding:6px;
        color:#fff;
        box-shadow:1px 1px 2px 1px rgba(0,0,0,.3);
        line-height:18px;
        text-align:center">
        <div>这里是内容</div>
    </div>
</div>
`;
let elWrap;
let elBox;
let timer;

function init() {
    appendHtml(html);
    elWrap = query('#bnjs-toast');
    elBox = elWrap.children[0];
    inited = true;
}

function show(text, time = 0) {
    if (!text) {
        return;
    }
    if (time > 1) {
        time = 0;
    }
    if (timer) {
        clearTimeout(timer);
    }
    time = timeConfig[time];
    if (!inited) {
        init();
    }
    text = text.split('\n');
    elBox.innerHTML = text.reduce((prev, cur) => prev + `<div>${cur}</div>`, '');
    if (elWrap.style.display === 'none') {
        elWrap.style.display = 'flex';
    }
    setTimeout(() => {
        elWrap.style.opacity = 1;
        timer = setTimeout(() => hide(), time);
    }, 0);
}

function hide() {
    clearTimeout(timer);
    elWrap.style.opacity = 0;
    one(elWrap, 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
        elWrap.style.display = 'none';
    });
}

export default {
    show
};
