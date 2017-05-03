/**
 * @file polyfill ui title
 * @author liyu(liyu09@baidu.com)
 */

import {throwIfMissing, emptyFunc} from '../util';

function setTitle(text) {
    document.title = text;
}

function addActionButton({
    tag = throwIfMissing('tag'),
    text = 'button',
    icon = '',
    style = 0,
    callback = emptyFunc
}) {
}

function addShopCartButton() {}

function addBubbleIcon() {}

function addT10NoticeButton() {}

function setClickableTitle() {}

function removeBtnAll() {}

function removeBtnByTag() {}

function addTagList() {}

export default {
    addActionButton,
    setTitle,
    addShopCartButton,
    addBubbleIcon,
    addT10NoticeButton,
    setClickableTitle,
    removeBtnAll,
    removeBtnByTag,
    addTagList
};
