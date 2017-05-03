/**
 * @file polyfill ui dialog
 * @author  liyu(liyu09@baidu.com)
 */

function show({message}) {
    alert(message);
}

function showLoading() {}

function hideLoading() {}

export default {
    show,
    showLoading,
    hideLoading
};
