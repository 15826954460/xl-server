/**
 * @author 柏运送
 * @date 2020-03-26 17:03:20
 * @description 数据格式校验中间件
*/

const { ErrorModule } = require('../response/responseData');
const { jsonSchemaValidateError } = require('../response/errorInfo');

/**
 * @param {Function} validateFn 数据格式校验函数
 */
function genValidate(validateFn) {
  // 定义中间件函数
  async function validate(ctx, next) {
    const data = ctx.request.body;
    const bool = validateFn(data);

    // 登陆数据格式校验失败
    if (!bool) {
      ctx.body = new ErrorModule(jsonSchemaValidateError)
      return;
    }

    // 登陆数据格式校验成功
    await next();
  }
  // 返回中间件
  return validate;
}

module.exports = {
  genValidate,
}
