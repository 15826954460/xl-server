/*
 * @Author: bys
 * @Date: 2020-03-21 21:34:38
 * @Description: 失败信息集合
*/

module.exports = {
  userNameExist: {
    code: 10001,
    msg: '用户名已存在'
  },
  // 用户名不存在
  userNameNotExist: {
    code: 10002,
    msg: '用户名不存在'
  },
  // 用户注册失败
  registerFail: {
    code: 10003,
    msg: '注册失败，请重试'
  },
  // 参数错误
  jsonSchemaValidateError: {
    code: 10004,
    msg: '数据格式校验错误'
  },
  // 用户名或密码错误
  loginError: {
    code: 10005,
    msg: '用户名或密码错误'
  },
  loginCheckFail: {
    code: 10006,
    msg: '您尚未登陆'
  }
}