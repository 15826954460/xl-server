/*
 * @Author: bys
 * @Date: 2020-03-26 16:23:16
 * @description: json schema 数据校验
 */
const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * @description json schema 检验规则
 * @param {Object} data 待校验数据
 */

function validate(schema, data = {}) {
  console.log(JSON.stringify(schema), JSON.stringify(data));
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.log(`${JSON.stringify(ajv.errors)}`);
    return false;
  } else {
    return true;
  }
}

module.exports = {
  validate
};
