/**
 * @file 项目相关的配置文件
 * @author memoryza(jincai.wang@foxmail.com)
 */
module.exports = {
    // 发布开发机配置
    deploy: [{
        rdtest:'http://cp01-rdqa04-dev120.cp01.baidu.com:8099/receiver.php',
        odpdir:'/home/users/wangjincai/odp/webroot'
    }][0],
    // 域名代理服务
    // 规则:https://github.com/chimurai/http-proxy-middleware
    proxy: {
        host: '0.0.0.0',
        disableHostCheck: true,
        proxy: [{
            // 教育频道页面api代理
            context: ['/gaiya'],
            target: 'http://cp01-rdqa-dev132.cp01.baidu.com:8181',
            headers: {
                Host: 'cp01-rdqa-dev132.cp01.baidu.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        },{
            context: ['/bizareatop'],
            target: 'https://chi.nuomi.com',
            headers: {
                Host: 'chi.nuomi.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        }, {
            // 丽人-个人中心 api代理
            context: ['/bnnserver'],
            target: 'http://bnhbp.nuomi.com',
            headers: {
                Host: 'bnhbp.nuomi.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        }]
    },
    // 项目根地址相对于webserver指定的跟地址路径
    webserverRoot: '',
    // webserverRoot: '/channel/output',
    //糯米组件平台分散认证域名
    domainlist: ['app.nuomi.com', 'chi.nuomi.com'],
    // 是否开启文件监听和请求参数补全
    audient: true
}