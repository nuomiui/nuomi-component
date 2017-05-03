/**
 * @file     %description%
 * @author   %author%
 * @dateTime %dateTime%
 */
import Vue from 'vue'
import {ready} from 'util/util';
import './%pagename%.less';

// import performance

ready((BNJS) => {
    // performance start
    BNJS.ui.title.setTitle("%description%");
    new Vue({
          el: '#wrapContainer',
          components: {}
    });
    // performance end
});
