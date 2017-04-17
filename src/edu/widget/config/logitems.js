/**
 * @File     打点需求项配置js
 * @Author   Memoryza
 * @DateTime 2016-04-19T11:48:00+0800
 * @return   API Object
 */
const log = {
    //搜索
    search: {
        actionID: 'edu_home_searchclick',
        actionExt: '教育-首页检索按钮点击',
    },
    // 返回
    back: {
        actionID: 'edu_home_backclick',
        actionExt: '教育-首页返回按钮点击'
    },
    //频道页_头部banner点击
    topbanner_click: {
        actionID: 'adv_click_edu_topbanner',
        actionExt: '教育-首页banner点击',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                adv_id: '${adv_id}'
            }
        }
    },
    //频道页_头部banner展现
    topbanner_show: {
        actionID: 'adv_show_edu_topbanner',
        actionExt: '教育-首页banner展现',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                adv_id: '${adv_id}'
            }
        }
    },
    // 频道页_头部banner(广告)点击
    topbanner_adv_click: {
        actionID: 'adst_click_education_banner',
        actionExt: '教育频道_banner_广告点击',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                adv_id: '${adv_id}'
            }
        }
    },
    // 频道页_头部banner(广告)展现
    topbanner_adv_show: {
        actionID: 'adst_show_education_banner',
        actionExt: '教育频道_banner_广告展示',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                adv_id: '${adv_id}'
            }
        }
    },
    // 频道页_金刚点击
    jingang_click: {
        actionID: 'edu_home_jingang',
        actionExt: '教育-首页金刚位点击',
        note: {
            ComExtraParams: {
                pos: '${pos}'
            }
        }
    },
    // 头条
    toutiao_click: {
        actionID: 'edu_home_toutiao',
        actionExt: '教育-首页头条点击',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                poi_id: '${poi_id}'
            }
        }
    },
    // 豆腐块（两列的)
    doufukuai_click: {
        actionID: 'edu_home_doufukuai',
        actionExt: '教育-首页豆腐块',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                id: '${id}',
            }
        }
    },
    // 榜单（两列的)
    bangdan_click: {
        actionID: 'edu_home_bangdan',
        actionExt: '教育-首页榜单点击',
        note: {
            ComExtraParams: {
                pos: '${pos}',
                id: '${id}'
            }
        }
    },
    // 分类ID
    category_click: {
        actionID: 'edu_home_tab',
        actionExt: '教育-首页分类tab',
        note: {
            ComExtraParams: {
                category_id: '${category_id}'
            }
        }
    },
    // 上拉加载更多数据
    load_more: {
        actionID: 'clicklog',
        actionExt: '3',
        note: {
            event: 'edu_home_load_more',
            ComExtraParams: {
                category_id: '${category_id}',
                page: '${page}'
            }
        }
    },
    // 店铺点击
    merchant_click: {
        actionID: 'edu_home_merchant_click',
        actionExt: '频道页_店铺点击',
        note: {
            ComExtraParams: {
                poi_id: '${poi_id}'
            }
        }
    }
};
module.exports = log;
