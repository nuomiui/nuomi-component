/**
 * @file polyfill config to BNJS for development
 * @author  miaojian(miaojian@baidu.com)
 */

import account from './account';
import baseService from './baseService';
import device from './device';
import env from './env';
import hardware from './hardware';
import http from './http';
import localStorage from './localStorage';
import location from './location';
import page from './page';
import statistic from './statistic';
import ui from './ui';
if (window.location.search.match(/need_bnjs/)) {
    const BNJS = {
        version: '0.0.1',
        account,
        baseService,
        device,
        env,
        hardware,
        http,
        localStorage,
        location,
        page,
        statistic,
        ui,
        isAllReady: true
    };

    global.BNJS = BNJS;
    // 模拟 BNJS 在 0.2 秒之后才触发 BNJSReady 事件
    setTimeout(() => {
        global.BNJS = BNJS;
        document.dispatchEvent(new CustomEvent('BNJSReady'));
    }, 200);
}
