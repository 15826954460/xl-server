/**
 * @author 柏运送
 * @date 2020-03-26 16:16:50
 * @description 添加数据格式校验规则
*/

const { validate } = require('./_validate')
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2
    },
    passWord: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 65536
    },
    // city: {
    //   type: ['string', null],
    //   maxLength: 255,
    // },
    gender: {
      type: 'number',
    }
  }
}

/**
 * @description 数据格式校验
 * @param {object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = {
  userValidate,
}
