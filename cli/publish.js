
/**
 * @file 上线打包脚本
 * @desc 上线前执行，生成组件包，git上生成tag
 * @author memoryza（wangjincai@baidu.com)
 **/
var child_process =  require('child_process');
var commonApi = require('./util/common');

module.exports = function (gulp) {
    gulp.task('publish', function () {
        var args = commonApi.args;
        if (!args.m) {
            commonApi.onError({message: '参数信息错误: gulp publish -m 模块名称 [-v 三位版本号(1.0.0)] [-d 描述]'});
        }

        if (!args.v && args.v.match(/^\d+\.\d+\.\d+$/)) {
            commonApi.onError({message: '请输入三位版本'});
        }


        var version = 'v' + args.v;
        if (!args.d) {
            args.d = version + '上线,时间' + commonApi.getYmdHms();
        }
        console.log('[gulp]代码构建中...');
        var gulpTaskTimer =  +new Date();
        child_process.exec('gulp release -v ' + args.v + ' -m ' + args.m, function (err, stdout, stderr){
            if (err) {
                commonApi.onError({message: err});
            }
            console.log('[gulp]代码构建完成，耗时:' + ((+new Date() - gulpTaskTimer) / 1000).toFixed(2) + 's');
            console.log('[git]打标签中...');
            child_process.exec('git tag -a ' + version + ' -m "' + args.d + '" && git push origin ' + version, function (err) {
                if (err) {
                    console.log('git 打标签失败，请手动执行命令：git tag -a ' + version +' -m ' + args.d);
                    commonApi.onError({message: err});
                }
                console.log('[git]打标签完成，查看请执行：git show ' + version);
            });
        });
    });
}
