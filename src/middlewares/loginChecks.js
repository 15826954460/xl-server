/**
 * @author 柏运送
 * @date 2020-04-12 09:50:42
 * @description 登陆验证中间件
 */

const { ErrorModule } = require('../response/responseData');
const { loginCheckFail, getSessionFail } = require('../response/errorInfo');

/**
 * @description API 登陆验证
 * @param {object} ctx  koa2 ctx
 * @param {function} next koa2 next
 */
const loginCheck = async (ctx, next) => {
  // 用户已经登陆
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  };

  // 用户未登录
  ctx.body = new ErrorModule(loginCheckFail);
}

/**
 * @description API session 验证
 * @param {*} ctx
 * @param {*} next
 */
const sessionCheck = async (ctx, next) => {
  // 用户已经登陆
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  };

  // 用户未登录
  ctx.body = new ErrorModule(getSessionFail);
}

module.exports = {
  loginCheck,
  sessionCheck,
}
