/**
 * @author 柏运送
 * @date 2020-03-21 21:15:28
 * @description 接口返回的数据模型
 */

/**
 * @description baseModule
 */
class BaseModule {
  constructor({ code, data, msg }) {
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
 * @description success 数据模型
 */
class SuccessModule extends BaseModule {
  constructor(data = {}) {
    super({ code: 0, data })
  }
}

class ErrorModule extends BaseModule {
  constructor({ code, msg }) {
    super({ code, msg })
  }
}


module.exports = {
  SuccessModule,
  ErrorModule,
}
