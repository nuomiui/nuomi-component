/**
 * @File     局部API接口
 * @Author   Memoryza
 * @DateTime 2016-03-25T11:48:00+0800
 * @return   API Object
 */
import apiList from 'config/api';
// 首页API
apiList.index = apiList.host + '/gaiya/jiaoyu/getInfo';
// 列表页面API
apiList.poilist = apiList.host + '/gaiya/jiaoyu/getList';
//头条
apiList.topline = apiList.host + '/bizareatop';
// 差异化API
module.exports = apiList;
