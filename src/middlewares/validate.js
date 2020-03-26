/*
 * @Author: bys
 * @Date: 2020-03-26 17:03:20
 * @description: 数据格式校验中间件
*/

const { ErrorModule } = require('../module/responseModule');
const { jsonSchemaValidateError } = require('../module/errorInfo');

/**
 * @param {Function} validateFn 数据格式校验函数
 */
function genValidate(validateFn) {
  // 定义中间件函数
  async function validate(ctx, next) {
    const data = ctx.request.body;
    const bool = validateFn(data);
    if (!bool) {
      // 校验失败
      ctx.body = new ErrorModule(jsonSchemaValidateError)
      return;
    }
    await next();
  }
  // 返回中间件
  return validate;
}

module.exports = {
  genValidate,
}