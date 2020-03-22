/*
 * @Author: bys
 * @Date: 2020-03-21 21:15:28
 * @Description: 接口返回的数据模型
 */

/**
 * baseModule
 */
class BaseModule {
  constructor({code, data, msg}) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

/**
 * success 数据模型
 */
class SuccessModule extends BaseModule {
  constructor(data = {}) {
    super({
      code: 0,
      data
    })
  }
}

class ErrorModule extends BaseModule {
  constructor({ code, msg }) {
    super({
      code,
      msg,
    })
  }
}


module.exports = {
  SuccessModule,
  ErrorModule,
}
