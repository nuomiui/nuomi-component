/**
 * @file 将wepack产出文件用fis3打到开发机上
 * @author   Memoryza(jincai.wang@foxmail.com)
 * @dateTime 2017-04-17T10:41:53+0800
 */
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');
var colors = require( "colors");
var commandApi = require('./common');
var opn = require('opn');
var project = commandApi.args.module;
var config = require('../../config');
var fisConfigFile = path.join(commandApi.modulePath, 'fis-config.js');
var jsTemp = fs.readFileSync(path.join(commandApi.cliPath, 'config/fis-config.js'), 'utf8');
var watch = ''; // watch暂时不做
var fisCommand = [
    'cd ' + commandApi.modulePath + ' && ',
    'fis3 release rd',
    watch,
    '-f',
    fisConfigFile
];
function WebpackFISDeploy() {
}
WebpackFISDeploy.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
      fs.writeFileSync(fisConfigFile, jsTemp.replace(/%projectName%/ig, project));
      child_process.exec(fisCommand.join(' '), function (err, data) {
          if (err) throw err;
          console.log('发布成功'.blue);
          opn(path.join(config.deploy.rdtest.replace('receiver.php', ''), commandApi.args.module, 'html/index.html?need_bnjs=1'));
      });
      callback();
  });
};
module.exports = WebpackFISDeploy;
