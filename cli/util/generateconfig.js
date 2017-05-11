/**
 * @file 根据项目生成config.json
 *
 * @author   Memoryza
 * @dateTime 2017-03-21T10:41:53+0800
 *
 */
const path = require('path');
const fs = require('fs');
const commonApi = require('./common');
const config = require(commonApi.projectDir + '/config');
let configFile = require(path.join(commonApi.srcPath, 'config'));
function WebpackGenerateConfig(options) {

}
WebpackGenerateConfig.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
      let configJSON = {
          id: commonApi.args.module,
          version: '1.0.0',
          tpl: 'nuomi',
          canPreload: 1,
          domainlist: config.domainlist,
          pages: configFile(commonApi.srcPath)
      };
      if (!fs.existsSync(commonApi.modulePath)) {
          fs.mkdirSync(commonApi.modulePath);
      }
      fs.writeFileSync(path.resolve(commonApi.modulePath, 'config.json'), JSON.stringify(configJSON, null, 4));
      let fileContent = fs.readFileSync(path.resolve(commonApi.modulePath, 'config.json'));
      compilation.assets['config.json'] = {
          source: function (){
              return fileContent
          },
          size: function() {
              return fileContent.length;
          }
      };
      fs.unlink(path.resolve(commonApi.modulePath, 'config.json'));
      callback();
  });
};
module.exports = WebpackGenerateConfig;
