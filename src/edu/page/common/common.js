/**
 * @file entry for common chunk (https://github.com/webpack/webpack/issues/1016)
 * @author memoryza(wangjincai@baidu.com)
 */
import './common.less';
import 'react';
import 'react-dom';
import 'npm-zepto';
import FastClick from 'fastclick';
FastClick.attach(document.body);
// 开发环境模拟BNJS和调试工具
if (__DEV__) {
    // require('dep/bnjs');
    // require('vconsole');
}