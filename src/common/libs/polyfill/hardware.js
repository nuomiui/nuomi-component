/**
 * @file polyfill hardware
 * @author  liyu(liyu09@baidu.com)
 */

function scanQRCode() {
}

function getWifiAround(callback) {
    callback({
        errno: 0,
        errmsg: '',
        data: {"wifi_conn":{"mac":"e4:aa:5d:57:a9:ee","sig":99,"ssid":"Baidu_WiFi"},"wifi":[{"mac":"e4:aa:5d:57:a9:ee","sig":99,"ssid":"Baidu_WiFi"}]}
    });
}

export default {
    scanQRCode,
    getWifiAround
};
