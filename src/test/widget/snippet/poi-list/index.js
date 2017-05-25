/**
 * @file poi列表
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-1 14:18:45
 */
import React, {Component} from 'react';
import PoiHeader from 'widget/snippet/poi-header';
import PoiItem from 'widget/snippet/poi-item';
import {Loading} from 'nuomi-ui';
import Scroll from 'dep/onscroll';
import {isArray, isObject, isWap, addLog} from 'util/util';
import {merchant_click, category_click} from 'widget/config/logitems';
import './index.less';
import {poilist as poiAPI} from 'widget/config/api';
// 额为什么单独拿出来，为了减少setState，虽然我没用immutable，因为让他够小吧
let hasMore = true; // 是否包含更多数据
let pageNum = 0;// 当前第几页
let isLoading = false; // 是否还在请求中的状态
let pageSize = 10; // 一页poi个数
const tabList = [{name: '外语', fid: 2093}
    , {name: '留学', fid: 2108}
    , {name: '升学', fid: 2106}
    , {name: '职业', fid: 2109}
    , {name: '早教', fid: 2017}
    , {name: '兴趣', fid: 2098}
    , {name: '其他', fid: 2149}];
let lastReq; // 最后一次请求才渲染
const getListData = (option, callback) => {
    option.cityId = BNJS.location.selectCityCode;
    option.location = BNJS.location.latitude + ',' + BNJS.location.longitude;
    option.v =  BNJS.env.appVersion;
    option.compV = BNJS.env.compVersion;
    option.terminal = isWap() ? 3 : 1;
    BNJS.http.getNA({
        url: poiAPI,
        params: option,
        onSuccess: (res) => {
            if(parseInt(res.errno,10) == 0
                && isObject(res.data) && isArray(res.data.search)) {
                callback({poi_list: res.data.search});
            } else {
                callback({poi_list: []});
            }
        },
        onFail: () => {
            BNJS.ui.toast.show("网络错误");
            callback({poi_list: []})
        }
    });
}

export default class PoiList extends Component {
    constructor(props) {
        super(props);
        let {list = []} = this.props;
        this.handleScroll = this.handleScroll.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handlerClickItem = this.handlerClickItem.bind(this);
        this.state = {
            loadingStatus: isArray(list) && list.length ? 4 : 3, // 默认加载状态
            list: list,
            tabIndex: 0 // 默认tab的位置
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            loadingStatus: isArray(nextProps.list) && nextProps.list.length ? 4 : 0,
            list: nextProps.list
        })
    }
    componentDidMount() {
        Scroll.add(this.handleScroll);
    }
    componentWillUnmount() {
        Scroll.remove(this.handleScroll);
    }
    // tab切换响应事件
    handleChangeTab(index) {
        let thiz = this;
        addLog(category_click, {category_id: tabList[index].fid});
        this.setState({
            list: [],
            loadingStatus: 3,
            tabIndex: index
        });
        pageNum = 0;
        getListData({
            pn: 0,
            fid: tabList[index].fid
        }, function (data) {
            let loadStatus = 4;
            // 没有数据
            if (data.poi_list.length === 0) {
                loadStatus = 0;
            }
            // 全部数据
            else if (data.poi_list.length < pageSize) {
                loadStatus = 2;
                hasMore = 0;
            }
            if (data.poi_list.length >= pageSize) {
                hasMore = 1;
            }
            thiz.setState({
                list: data.poi_list,
                loadingStatus: loadStatus
            });
        });
    }
    // 向上拉动事件
    handleScroll() {
        // 当前状态是大的加载中和没有数据不能下啦加载
        if ($(window).scrollTop() >= $(document).height() - $(window).height()
            && hasMore && !isLoading && this.state.loadingStatus !== 0
            && this.state.loadingStatus !== 3) {
            this.setState({loadingStatus: 1});
            var thiz = this;
            isLoading = true;
            pageNum++;
            getListData({
                pn: pageNum,
                fid: tabList[this.state.tabIndex].fid
            }, function (data) {
                isLoading = false;
                let loadStatus;
                if (data.hasmore) {
                    hasMore = 1;
                    loadStatus = 4;
                }
                else if (data.poi_list.length < pageSize) {
                    hasMore = 0;
                    loadStatus = 2;
                }
                thiz.setState({
                    list: thiz.state.list.concat(data.poi_list),
                    loadingStatus: loadStatus
                });
            });
        }
    }
    // 点击单个POI
    handlerClickItem(index) {
        let item = this.state.list[index];
        if (isObject(item)) {
            // 如果是广告做计费日志请求
            if (item.source && item.chargeUrl) {
                BNJS.http.get({
                    url : item.chargeUrl,
                    params: {
                        cid: item.cid,
                        tsmcid: item.tsmcid
                    }
                });
            }
            addLog(merchant_click, {poi_id: item.poiId});
            BNJS.page.start(item.poiJumpUrl);
        }
    }
    render() {
        let {list} = this.state;
        return (<div className="PoiList">
            <PoiHeader tabList={tabList} click={this.handleChangeTab} />
            <div className="poi-list">
                {list && list.length
                    ? list.map((item, index) => {
                        item.poiPrice = item.perPrice && !isNaN(item.perPrice) ? (parseInt(item.perPrice, 10) / 100).toFixed(2) : '';
                        item.poiImage = item.tinyImage;
                        item.score = item.averageScore;
                        item.reason = item.recomReason;
                        item.bizarea = item.bizareaTitle;
                        item.displayString = item.source ? '广告' : '';
                        item.tuanTitle = isArray(item.detail) && isObject(item.detail[0]) ? item.detail[0].minTitle : '';
                        item.promotionText = isArray(item.detail) && isObject(item.detail[0]) ? item.detail[0].promotionText : '';
                        item.poiTags = [];
                        if (item.isAward) {
                            item.poiTags.push({
                                name: '聚'
                            });
                        }
                       return <PoiItem {...item} key={index} index={index} click={this.handlerClickItem}/>
                    })
                    : null
                }
                <Loading status={this.state.loadingStatus} />
            </div>
        </div>);
    }
};
