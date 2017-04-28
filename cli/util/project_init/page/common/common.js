/**
 * @file entry for common chunk (https://github.com/webpack/webpack/issues/1016)
 * @author memoryza(wangjincai@baidu.com)
 */
import './common.less';
import 'vue';
import 'npm-zepto';
import FastClick from 'fastclick';
FastClick.attach(document.body);