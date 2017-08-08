/**
 * @file 横向团单列表
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-6 11:14:10
 * @param {Array} list 数据列表
 * @param {String} componentType 组件类型[block(豆腐块)|bangdan(榜单)]
 */
import React, {Component} from 'react';
import './index.less';
import {bangdan_click, doufukuai_click} from 'widget/config/logitems';
import {addLog} from 'util/util';
export default class Deal extends Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(e) {
        let index = parseInt(e.currentTarget.getAttribute('data-i'), 10);
        let id = e.currentTarget.getAttribute('data-id');
        let url = this.props.list[index].cont;
        if (url) {
            let logKey = this.props.componentType === 'block' ? doufukuai_click : bangdan_click;
            addLog(logKey, {id: id, pos: index + 1});
            BNJS.page.start(url);
        }
    }
    render() {
        let {list = [], len = 2} = this.props;
        if (list && list.length) {
            list = list.slice(0, len);
            let className = "deal ";
            if (this.props.className) {
                className += this.props.className;
            }
            return (<div className={className}>
                    {this.props.title
                        ? <div className="title">热门榜单</div>
                        : null
                    }
                    <ul>
                        {list.map((item, i) => {
                            return (<li key={i} data-id={item.id} data-i={i} onClick={this.handlerClick}>
                                <div className="img">
                                    <img src={item.img}/>
                                </div>
                                <span className="sub-title">{item.advName}</span>
                            </li>);
                        })}
                    </ul>
                </div>);
        } else {
            return null;
        }
    }
};