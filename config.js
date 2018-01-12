/**
 * @file 项目相关的配置文件
 * @author memoryza(jincai.wang@foxmail.com)
 */
module.exports = {
    // 发布开发机配置(fisp的配置）
    deploy: [{
        rdtest:'http://xxxx.com/receiver.php',
        odpdir:'/xxxx/webroot'
    }][0],
    // 域名代理服务
    // 规则:https://github.com/chimurai/http-proxy-middleware
    proxy: {
        host: '0.0.0.0',
        disableHostCheck: true,
        proxy: [{
            // 页面api代理
            context: ['/gaiya'],
            target: 'https://xxx.com',
            headers: {
                Host: 'xxx.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        },{
            context: ['/bizareatop'],
            target: 'https://xxx.com',
            headers: {
                Host: 'xxx.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        }]
    },
    // 项目根地址相对于webserver指定的跟地址路径
    webserverRoot: '',
    // webserverRoot: '/channel/output',
    //组件平台分散认证域名
    domainlist: ['xxx.xxx.com'],
    // 是否开启文件监听和请求参数补全
    audient: true
}
