/**
 * 日志类
 * @file 点击量相关信息会自动报道MTJ和棱镜、异常只报道棱镜.以棱镜为主
 * @author   Memoryza
 * @DateTime 2016-04-15T13:47:06+0800
 */
const type = (o) => {
  return Object.prototype.toString.call(o);
};
const isObject = (obj) => {
  return type(obj) == "[object Object]";
};
const isArray = (obj) => {
  return type(obj) === '[object Array]';
};
const isPlainObject = (obj) => {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
function extend(target, source, deep) {
    for (var key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
}
module.exports = {
    /**
     * @param    {[type]}                 logKey [log的Key]
     * @param    {[type]}                 params [对应替换参数]
     */
    addLog: (logKey, params) =>{
        if (!logKey) {
            return console.error('请确认包含logKey');
        }
        let options = {};
        extend(options, logKey, 1);
        if (options.note && Object.prototype.toString.call(options.note.ComExtraParams) === '[object Object]') {
            if (Object.prototype.toString.call(params) === '[object Object]') {
                for (let i in options.note.ComExtraParams) {
                    if (i && options.note.ComExtraParams.hasOwnProperty(i)
                        && options.note.ComExtraParams[i]
                        && options.note.ComExtraParams[i].match(/\$\{\w+\}/)) {

                        if (params[i] !== undefined) {
                            options.note.ComExtraParams[i] = options.note.ComExtraParams[i].replace(/\$\{\w+\}/g, params[i]);
                        }
                        else {
                            return console.log('params缺少参数' + i);
                        }
                    }
                }
                options.note.ComExtraParams = JSON.stringify(options.note.ComExtraParams);
            }
            else {
                return console.log('params不能为空');
            }
        }
        if (__DEV__) {
            console.log(JSON.stringify(options));
        }
        else {
            BNJS.statistic.addLog(options);
        }
    },
    /**
     * 异常调用, msg 异常信息 pageName 页面名称
     * @param    {[Object]} option 必须包含pageName [页面名称] msg  [出错的详细信息]
     * @param    {[String]} msg替换信息
     * @param    {[String]} 组件名称
     * @example  addException('hairdersser-list', '获取xx接口数据报错,异常数据{xxx}')
     */
    addException: (option, msg, compName) => {
        if (typeof option !== 'object') {
            return console.error('参数错误')
        }
        msg = msg || '';
        let pageName = option.pageName;
        let detail = option.msg && option.msg.replace(/\$msg\$/g, msg);
        if (!pageName || !detail) {
            return console.error('请确认包含pageName和msg参数');
        }
        if (__DEV__) {
            console.warn('页面名称:' + pageName, '异常信息:' + detail);
        } else {
            BNJS.statistic.addLog({
                actionID: 'CompPageError',
                actionExt: (compName || 'channel'),
                note: {
                    compv: '1.0.0',
                    comppage: pageName,
                    detail: detail
                }
            });
        }
    }
}
