/**
 * @file 这家伙很懒没有留下描述
 * @author   memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-4-5 15:35:25
 * @param {String} color 默认文字颜色 #c3904e
 * @param {String} text 文字内容
 */
import React, {Component} from 'react';
import './index.less';
export default class Icons extends Component {
    render() {
        let {color="#c3904e"} = this.props;
        return (<span style={{'color': color}} className="circle-icon">{this.props.text}</span>);
    }
};