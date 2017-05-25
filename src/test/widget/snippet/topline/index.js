/*
* @file 头条
* @author zhangmingxue@baidu.com
* @dateTime 2017-04-06
* */
import React,{Component} from 'react';
import {Topline as ToplineParent} from 'nuomi-ui';
import {topline as toplineApi} from 'widget/config/api';
import {addLog, isObject, isWap} from 'util/util';
import LogItem from 'widget/config/logitems';
import './index.less';
export default class Topline extends Component{
    constructor(props){
        super(props);
        this.bindEvent = this.bindEvent.bind(this);
        this.state = {
            list: []
        };
        let self = this;
        BNJS.http.get({
            url: toplineApi,
            params: {
                action: 'getNhAreaInfo',
                // action: 'getChAreaInfo',
                city_id: BNJS.location.selectCityCode,
                location: BNJS.location.latitude + ',' + BNJS.location.longitude,
                bizfrom: 'nuomi_edu',
                config_id: 8,
                pa: 'nuomi'
            },
            onSuccess: (res) => {
                if (isObject(res) && parseInt(res.errno, 10) === 0
                && isObject(res.data)){
                    self.setState({
                        list: res.data.scroll_inform_list
                    });
                } 
            }
        });
    }
    bindEvent(index){
        let itemList = this.state.list;
        let id = itemList && itemList[index] && itemList[index].id;
        addLog(LogItem.toutiao_click,{
            pos: parseInt(index)+1,
            poi_id: id
        });
        
        let url = itemList && itemList[index] && itemList[index].url;
        let wapUrl = itemList && itemList[index] && itemList[index].wap_url;
        BNJS.page.start(isWap()? wapUrl : url);
    }
    render(){
        let {count=5} = this.props;
        return(
            <div>
            {this.state.list.length
                ? <ToplineParent count={count} data={this.state.list} click={this.bindEvent}/>
                : null
            }
            </div>
        );
    }
}
