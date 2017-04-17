var config =  require('../../config.js');
var deploy= config.deploy;

//添加属性函数
function addRules(media,rules){
    var fiser = fis;
    if(rules === undefined){
        rules = media;
    }else{
        fiser = fis.media(media);
    }
    fis.util.map(rules, function(selector, rule) {
        fiser.match(selector, rule);
    });
}
// 命名空间设置
fis.set('namespace', '%projectName%');
//发布测试机处理函数
function push(to) {
    return fis.plugin('http-push', {
        receiver: deploy.rdtest,
        to: to
    });
}
addRules({
    '*': {
        optimizer: null
    },
    '*': {
        release: '%projectName%/$0'
    },
    'fis-config.js': {
        release: false
    }
});

addRules('rd',{
    '*': {
        deploy: push(deploy.odpdir)
    }
});
