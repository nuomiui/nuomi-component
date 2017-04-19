/**
 * @file     全局公用的API接口
 * @author   Memoryza
 * @return   {Object}
 */
let host = 'https://chi.nuomi.com';
// 这几个变量会被webpack在执行DefinePlugin时动态替换
// QA测试环境地址
if (__QA__) {
    host = 'http://cp01-t10-qa-test05.epc.baidu.com:8182';
}
else if (__DEV__) {
    host = 'http://cp01-rdqa-dev132.cp01.baidu.com:8181';
}
else if (__PRO__) {
    host = 'https://chi.nuomi.com';
} else if (window.location.search.match('need_bnjs')) {
    host = '';
}
let apiList = {
};
for (let i in apiList) {
    if (i && apiList.hasOwnProperty(i)) {
        apiList[i] = host + apiList[i];
    }
}
apiList.host = host;
module.exports = apiList;
