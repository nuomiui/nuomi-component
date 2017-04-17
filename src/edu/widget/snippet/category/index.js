/*
* @file 金刚位
* @author zhangmingxue@baidu.com
* @dateTime 2017-04-06
* */
import React, {Component} from 'react';
import {Category as ParentCategory} from 'nuomi-ui';
import {addLog} from 'util/util';
import LogItem from 'widget/config/logitems';
import './index.less';

export default class Category extends Component{
    constructor(props) {
        super(props);
        this.bindEvent = this.bindEvent.bind(this);
    }
    bindEvent(index){
        //TODO 跳转+埋点
        let targetUrl = this.props.data && this.props.data[index] && this.props.data[index].count;
        //点击埋点
        addLog(LogItem.jingang_click, {pos: parseInt(index) + 1});
        targetUrl && BNJS.page.start(targetUrl);
    }
    render() {
        let {data = [], count} = this.props;
        return (
            <ParentCategory category={data} count={count} click={this.bindEvent}/>
        );
    }
}