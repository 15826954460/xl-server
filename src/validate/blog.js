/**
 * @author 柏运送
 * @date 2020-03-26 16:16:50
 * @description 添加数据格式校验规则
*/

const { validate } = require('./_validate')
const SCHEMA = {
  type: 'object',
  properties: {
    comment: {
      type: 'string',
    },
  }
}

/**
 * @description 数据格式校验
 * @param {object} data 微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = {
  blogValidate,
}
