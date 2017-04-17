/**
 * @file polyfill page
 * @author  liyu(liyu09@baidu.com)
 */

function addLog(...arg) {
    console.log(...arg);
}

function addCtag() {}

function addMTJ() {}

export default {
    addLog,
    addCtag,
    addMTJ
};
