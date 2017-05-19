/**
 * reload page and clear cache
 * @author zhangmingxue
 * @date 2017-05-11
 */
import $ from 'vconsole/src/lib/query.js';
import * as tool from 'vconsole/src/lib/tool.js';
import VConsolePlugin from 'vconsole/src/lib/plugin.js';
import tplTabbox from './tabbox.html';

class VConsoleExtendTab extends VConsolePlugin {

    constructor(...args) {
        super(...args);

        this.$tabbox = $.render(tplTabbox, {});
        this.isReady = false;
    }

    onRenderTab(callback) {
        callback(this.$tabbox);
    }

    onReady() {
        var that = this;
        that.isReady = true;

        // expend group item
        $.delegate($.one('.vc-log', this.$tabbox), 'click', '.vc-group-preview', function(e) {
            let $group = this.parentNode;
            if ($.hasClass($group, 'vc-actived')) {
                $.removeClass($group, 'vc-actived');
            } else {
                $.addClass($group, 'vc-actived');
            }
            e.preventDefault();

        });

        // log type filter
        let $subTabs = $.all('.vc-subtab', that.$tabbox);
        $.bind($subTabs, 'click', function(e) {
            e.preventDefault();
            if ($.hasClass(this, 'vc-actived')) {
                return false;
            }
            $.removeClass($subTabs, 'vc-actived');
            $.addClass(this, 'vc-actived');

            if($.hasClass(this, 'reload')){
                document.location.reload();
            }
            if($.hasClass(this, 'clearStorage')){
                localStorage.clear();
                console.log('localStorage清除成功');
            }
        });
    }
}

export default VConsoleExtendTab;