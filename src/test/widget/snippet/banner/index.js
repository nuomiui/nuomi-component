/*
 * @file banner
 * @author zhangmingxue@baidu.com
 * @dateTime 2017-04-06
 * */
import React, {Component} from 'react';
import {CarouselBanner} from 'nuomi-ui';
import {addLog,inViewAll} from 'util/util';
import LogItem from 'widget/config/logitems';

export default class Banner extends Component{
    constructor(props) {
        super(props);
        this.bindEvent = this.bindEvent.bind(this);
        this.addShowLog = this.addShowLog.bind(this);
    }
    bindEvent(index){
        //TODO 跳转+埋点
        let targetUrl = this.props.data && this.props.data[index] && this.props.data[index].cont;
        let adverId = this.props.data && this.props.data[index] && this.props.data[index].id;
        
        //点击埋点
        addLog(LogItem.topbanner_click,{
            pos: parseInt(index)+1,
            adv_id: adverId
        });
        let isAdv = this.props.data && this.props.data[index] &&this.props.data[index].adv_status;
        if(isAdv){
            addLog(LogItem.topbanner_adv_click,{
                pos: parseInt(index)+1,
                adv_id: adverId
            });
        }
        targetUrl && BNJS.page.start(targetUrl);
    }
    addShowLog(ele,index){
        let that = this;
        let timer = null;
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (inViewAll(ele, 0)) {
                
                let adverId = that.props.data && that.props.data[index] &&that.props.data[index].id;
                //展现埋点
                addLog(LogItem.topbanner_show,{
                    pos: parseInt(index)+1,
                    adv_id: adverId
                });

                //广告埋点
                let isAdv = that.props.data && that.props.data[index] &&that.props.data[index].adv_status;
                if(isAdv){
                    addLog(LogItem.topbanner_adv_show,{
                        pos: parseInt(index)+1,
                        adv_id: adverId
                    });
                }
            }
        }, 1000);
    }
    render(){
        let {data = [],height} = this.props;
        return (
            <CarouselBanner itemlist={data} height={height} click={this.bindEvent} addLogFun = {this.addShowLog} />
        );
    }
}