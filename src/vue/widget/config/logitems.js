/**
 * @File     打点需求项配置js
 * @Author   Memoryza
 * @DateTime 2016-04-19T11:48:00+0800
 * @return   API Object
 */
const log = {
    // 埋点事例, 使用时请删除
    demo_click: {
        actionID: '数据平台申请的ID',
        actionExt: '数据平台申请的ID的说明',
        note: {
            ComExtraParams: {
                '扩展参数key': '${扩展参数key}'
            }
        }
    }
};
module.exports = log;