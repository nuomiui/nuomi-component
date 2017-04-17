/**
 * @file     教育首页
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-1 11:0:23
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {index as indexAPI} from 'widget/config/api';
import {ready, isObject, getLS, isAndroid, isIos, isWap, isArray, versionCompare, addLog} from 'util/util';
import LogItem from 'widget/config/logitems';
import Banner from 'widget/snippet/banner';
import Category from 'widget/snippet/category';
import Topline from 'widget/snippet/topline';
import Deal from 'widget/snippet/deal';
import PoiList from 'widget/snippet/poi-list';
import './index.less';
import defaultJson from './index.json';
// 默认数据存储在ls中的数据
const cacheKey = 'edu_channel_index';
let appSelf;
// import performance
class App extends Component {
    constructor(props) {
        super(props);
        appSelf = this;
        this.state = this.props.data;
    }
    componentDidMount() {
        window.sampleObj.renderTime = +new Date();
        BNJS.ui.hideLoadingPage();
        // 调整ui
        $('.category-list-ul').css('height', $('.category-list-ul .screen').height());
        // debug info
    }
    render() {
        return (<div className="box">
            {isObject(this.state.namis) && <Banner data={this.state.namis.banners} height={84}/>}
            {isObject(this.state.namis) && <Category data={this.state.namis.jingang} count={10}/>}
            <Topline count={5}/>
            {isObject(this.state.namis) && <Deal className="deal-two-column" list={this.state.namis.block} componentType="block"/>}
            {isObject(this.state.namis) && <Deal title="热门榜单" list={this.state.namis.top} len={3}/>}
            <PoiList list={this.state.search}/>
        </div>);
    }
};

ready((BNJS) => {
    window.sampleObj.bnjsReadyTime = +new Date();
    // performance start
    const setTitleSearch = (hotword)=>{
       // APP版本在6.6.1及以上是展示通栏搜索框，在6.6.1一下展示搜索按钮
        let isGTE661 = versionCompare(BNJS.version, '2.6') >= 0;
        let searchSchema = 'bainuo://search?&vt_cat=375';
        if(isGTE661){
            hotword && BNJS.ui.title.addSearchBar({
                text: hotword,
                showVoiceIcon: true,
                callback: function(res){
                    addLog(LogItem.search);
                    BNJS.page.start(searchSchema + '&externHintText=' + encodeURIComponent(hotword));
                }
            });
        }else{
            BNJS.ui.title.setTitle('教育培训');
            BNJS.ui.title.addActionButton({
                tag: '1',
                text: 'Search',
                icon: 'search',
                callback: function () {
                    addLog(LogItem.search);
                    BNJS.page.start(searchSchema);
                }
            });
        }
    }
    // 设置头部搜索
    setTitleSearch();
    //返回按钮
    BNJS.page.onBtnBackClick({
        callback: function () {
            addLog(LogItem.back);
            BNJS.page.back();
        }
    });
    BNJS.page.enableBounce(false);
    // 网络请求
    BNJS.http.get({
        url: indexAPI,
        params: {
            type: 7,
            cityId: BNJS.location.selectCityCode,
            location: BNJS.location.latitude + ',' + BNJS.location.longitude,
            fid: 2093,// 默认外语
            pn: 0,
            v: BNJS.env.appVersion,
            deviceType: isAndroid() ? 1 :(isIos() ? 2 : 0),
            compV: BNJS.env.compVersion,
            terminal: isWap() ? 3 : 1
        },
        onSuccess: (res) => {
            if (isObject(res) && parseInt(res.errno, 10) === 0
                && isObject(res.data)) {
                setTitleSearch(res.data.hotword);
                // 必须要有金刚才渲染页面（pm需求)
                if (isObject(res.data.namis)
                    && isArray(res.data.namis.jingang) && res.data.namis.jingang.length) {
                    appSelf.setState(res.data);
                    if (isArray(res.data.namis.block) && res.data.namis.block.length
                        && isArray(res.data.namis.top) && res.data.namis.top.length) {
                        BNJS.localStorage.setItem(cacheKey, JSON.stringify(res));
                    }
                } else {
                    BNJS.ui.toast.show("数据异常");
                }
            } else {
                BNJS.ui.toast.show("获取数据失败");
            }
        },
        onFail: (res) => {
            BNJS.ui.toast.show("网络异常");
        }
    });
    getLS(cacheKey, (pData) => {
        ReactDOM.render(<App data={pData.data}/>,
            document.getElementById('wrapContainer'));
    }, () => {
        ReactDOM.render(<App data={defaultJson.data}/>,
            document.getElementById('wrapContainer'));
    });
    // performance end
});
