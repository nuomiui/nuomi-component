/**
 * @file     这家伙很懒没有留下描述
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-28 17:29:49
 */
import Vue from 'vue';
import {ready} from 'util/util';
import './index.less';
// import performance

ready((BNJS) => {
    // performance start
    BNJS.ui.title.setTitle("这家伙很懒没有留下描述");
    new Vue({
        el: '#wrapContainer',
        data: {
            message: 'test'
        },
        mounted: () => {
            BNJS.ui.hideLoadingPage();
        }
    });
    // performance end
});
