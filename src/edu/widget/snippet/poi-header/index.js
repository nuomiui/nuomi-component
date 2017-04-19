/**
 * @file poi头部
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-1 14:43:50
 */
import React, {Component} from 'react';
import './index.less';
const defaultIndex = 0;
let $scrollDom;
export default class PoiHeader extends Component {
    constructor(props) {
        super(props);
        this.handlerClickTab = this.handlerClickTab.bind(this);
    }
    componentDidMount() {
        $scrollDom = $('.poi-header-container .bottom-bar');
        let $scrollUl = $('#poiTabMenu');
        const len = this.props.tabList.length;
        const windowWidth = $(window).width();
        let liWidth = len * $('#poiTabMenu li').width() + (len - 1) * 24;
        if (liWidth > windowWidth) {
            liWidth += 40;
            $($('#poiTabMenu li').get(len - 1)).css('margin-right', '36px');
            $('.right-linear-gradient').removeClass('hide');
        }
        $scrollUl.css('width', liWidth);
    }
    // 只渲染一次
    shouldComponentUpdate() {
        return false;
    }
    handlerClickTab(e) {
        let $dom = $(e.target);
        if (!$dom.hasClass('active')) {
            let index = $dom.data('index');
            $('#poiTabMenu li').removeClass('active');
            // 滚动距离
            $scrollDom.css({'display': 'inline-block'}).animate({'left': $dom.offset().left}, 200, function () {
                $dom.addClass('active');
                $scrollDom.css('display', 'none');
            });
            this.props.click && this.props.click(index);
        }
    }
    render() {
        // 为啥额外加一层poi-header-container不直接放在poi-header，因为poi-header设置横向滚动弹性效果，这时候滑动会影响fixed的元素
        return (<div className="poi-header-container">
                <div className="poi-header">
                <ul id="poiTabMenu" className="poi-tab-menu">
                    {this.props.tabList.map((item, index) => {
                        return <li data-index={index} onClick={this.handlerClickTab} key={index} className={index === defaultIndex ? 'active' : ''}>
                        {item.name}
                        <div className="li-bottom-bar"></div>
                        </li>
                    })}
                </ul>
            </div>
            <div className="bottom-bar"></div>
            <div className="right-linear-gradient hide"></div>
        </div>
        );
    }
};