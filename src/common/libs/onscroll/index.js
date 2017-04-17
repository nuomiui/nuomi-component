/**
 * @file    管理全局对window.scroll事件的监听，避免性能问题
 *          对滚动的监听事件将放在一个队列中，每100ms检查、触发，避免对滚动事件的阻塞，影响流畅度
 *
 * @exports

        add: function (handler) {}
            add a listener

        remove: function (handler) {}
            remove listener
 *
 * @author  nighca
 * @date    2015/03/09
 */

define(function (require, exports, module) {

    // the interval for check (ms)
    var interval = 50;

    // the listener list
    var listeners = [];

    // if listening
    var listening = false;

    // the check timer
    var checkTimer;

    // the scroll event
    var scrolled;

    // last postion
    var lastPos = 0;

    // record the scroll event
    var record = function (e) {
        scrolled = e;

        var pos = window.pageYOffset;

        scrolled.offset = pos - lastPos;
        lastPos = pos;
    };

    // check if scroll event exists
    var check = function () {
        if (scrolled) {
            // trigger listeners
            listeners.forEach(function (listener) {
                listener(scrolled);
            });

            // clear scroll event
            scrolled = null;
        }
    };

    // start listening event 'scroll'
    var startListening = function () {
        listening = true;

        // listen to scroll of window
        window.addEventListener('scroll', record);

        // check every 100ms
        checkTimer = setInterval(check, interval);
    };

    // stop listening event 'scroll'
    var stopListening = function () {
        listening = false;

        // clear scroll event
        scrolled = null;

        // stop listening to scroll of window
        window.removeEventListener('scroll', record);

        // stop checking
        checkTimer = clearInterval(checkTimer);
    };

    // add a listener
    var addListener = function (handler) {
        // if not listening, start listening
        if (!listening) {
            startListening();
        }

        listeners.push(handler);
    };

    // remove listener
    var removeListener = function (handler) {
        var arr = [];

        // exclude given listener
        listeners.forEach(function (item) {
            if (item !== handler) {
                arr.push(item);
            }
        });

        listeners = arr;

        // if no listeners, stop listening
        if (!listeners.length) {
            stopListening();
        }
    };

    module.exports = {
        add: addListener,
        remove: removeListener
    };
});
