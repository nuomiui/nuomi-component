/**
 * @file 单个POI项目
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-1 14:16:34
 */
import React, {Component} from 'react';
import Star from 'gwidget/star';
import Icons from 'widget/snippet/icons';
import './index.less';
export default class PoiItem extends Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(e) {
        let index = e.currentTarget.getAttribute('data-index');
        this.props.click && this.props.click(index);
    }
    render() {
        let poiClassName = 'title';
        let {poiTags = []} = this.props;
        // 没有标签和广告的标题样式
        if (!this.props.displayString && !poiTags.length) {
            poiClassName += ' large';
        }
        // 没有标签或者广告的标题样式
        else if (!this.props.displayString || !poiTags.length) {
            poiClassName += ' middle';
        }
        return (<div className="poi-item" onClick={this.handlerClick} data-index={this.props.index}>
            <div className="merchant border-bottom">
                <div className="img"><img src={this.props.poiImage} /></div>
                <div className="information">
                    <div className="info">
                        <span className={poiClassName}>{this.props.poiName}</span>
                        {this.props.displayString
                            ? <span className="ads">{this.props.displayString}</span>
                            : null
                        }
                        <div className="icons">
                            {poiTags.map((item, i) => {
                                return <Icons text={item.name} key={i}/>
                            })}
                        </div>
                    </div>
                    <div className="poi-star">
                        <Star hideScore={1} score={this.props.score}/>
                        {this.props.reason
                            ? <div className="reason">{this.props.reason}</div>
                            : null
                        }
                    </div>
                    {this.props.poiPrice
                        ? <div className="price">￥{this.props.poiPrice}/人</div>
                        : null
                    }
                    <div className="biz-area">
                        {this.props.bizarea
                            ? <span className={this.props.poiDistance ? 'after-point' : ''}>{this.props.bizarea}</span>
                            : null
                        }
                        {this.props.poiDistance
                            ? <span>距您{this.props.poiDistance}</span>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="group-info">
                {this.props.shopingTitle
                    ? <div className="fu">
                        <div className="sub-title"><span className="icon fu-icon">付</span></div>
                        <div className="content">{this.props.shopingTitle}</div>
                    </div>
                    : null
                }
                {this.props.tuanTitle
                    ? <div className="tuan">
                        <div className="sub-title">
                        {this.props.promotionText
                            ? <span className="tag"><span className="tag-text">{this.props.promotionText}</span></span>
                            : null
                        }
                        <span className="icon tuan-icon">团</span></div>
                        <div className="content">{this.props.tuanTitle}</div>
                    </div>
                    : null
                }
            </div>
            <div style={{'height': '10px', 'backgroundColor': '#f3f6f5'}}></div>
        </div>);
    }
};
