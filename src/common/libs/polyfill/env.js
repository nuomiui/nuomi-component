/**
 * @file polyfill env
 * @author  liyu(liyu09@baidu.com)
 */

function network(callback) {
    callback({
        network: 'wifi'
    });
}

function getConfig(callback) {
    callback({
        errno: 0,
        errmsg: 'success',
        data: {}
    });
}

function acCode() {
}

function getCompConfig(callback) {
    callback({
        errno: 0,
        errmsg: 'success',
        data: {
            compClickOn: 0
        }
    });
}

export default {
    cuid: '32b91684279e688b0c6703e1de807bea',
    appName: 'bainuo-wap',
    appVersion: '6.5.2',
    appChannel: 'test',
    sidList: ['502'],
    uuid: 'test',
    packageName: 'com.nuomi',
    compVersion: '来自调试工具版本:1.0.0',
    compId: 'test',
    compPage: 'index',
    network,
    getConfig,
    acCode,
    getCompConfig
};
