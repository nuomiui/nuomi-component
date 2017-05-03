/**
 * @file polyfill device
 * @author  liyu(liyu09@baidu.com)
 */

function setScreenRotate() {
}

function call(phoneNumber) {
    global.location.href = 'tel:' + phoneNumber;
}

function getTelBook(callback) {
    callback({
        errno: 0,
        errmsg: 'success',
        data: {
            phone: ['18711678929', '18711678928'],
            name: 'test'
        }
    });
}

export default {
    name: 'iPhone 5',
    platform: (/android/i).test(navigator.userAgent) ? 'Android' : 'ios',
    os: '9.1.0',
    screenWidth: global.screen.width,
    screenHeight: global.screen.height,
    setScreenRotate,
    call,
    getTelBook
};
