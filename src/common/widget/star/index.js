/**
 * @file 评分功能
 * @author memoryza(wangjincai@baidu.com)
 * @date 2016-09-21 11:23
 * @param {float} score [浮点型评分数字]
 * @param {boolean} hideScore [是否隐藏评分，默认为1]
 */
'use strict';
require('./index.less');
import React from 'react';
let Star = React.createClass({
    render: function() {
        var score = parseFloat(this.props.score);
        if (score < 0) {
            return <div className="unscore">暂无评分</div>
        }
        score = score > 5 ? 5 : score;
        var intNum = parseInt(score);
        var floatNum = score - intNum;
        var width = 0.157 * intNum + 0.052 * intNum + floatNum * 0.157;
        var inStyle = {'width': width * 100 + '%'};
        var hideScore = this.props.hideScore || 0;
        return <div className="stars">
            <div className="star-bg"><span className="star" style={inStyle}></span></div>
            {hideScore
                ? null
                : <em className="score">{this.props.score}</em>
            }
        </div>
    }
});
module.exports = Star;