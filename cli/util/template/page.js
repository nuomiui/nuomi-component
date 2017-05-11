/**
 * @file     %description%
 * @author   %author%
 * @dateTime %dateTime%
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Category} from 'nuomi-ui';
import api from 'widget/config/api';
import {ready} from 'util/util';
import './%pagename%.less';
// import performance
class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // debug info
    }
    render() {
        return (<div className="box"></div>)
    }
};
ready((BNJS) => {
    BNJS.ui.hideLoadingPage();
    // performance start
    BNJS.ui.title.setTitle("%description%");
    // todo ajax请求完数据调用该渲染
    let data = {};
    ReactDOM.render(<App data={data}/>,
        document.getElementById('wrapContainer'));
    // performance end
});
