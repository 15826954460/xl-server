/**
 * @author 柏运送
 * @date 2020-03-21 21:34:38
 * @description 失败信息集合
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
  // 登陆验证失败
  loginCheckFail: {
    code: 10006,
    msg: '您尚未登陆'
  },
  // 删除用户失败
  deleteUserFail: {
    code: 10007,
    msg: '您尚未登陆'
  },
  // session 过期
  getSessionFail: {
    code: 10008,
    msg: 'session 过期，请重新登陆'
  },
  // 文件尺寸过大
  fileSizeOverMaxSize: {
    code: 10009,
    msg: '文件大小超过5M'
  }
}