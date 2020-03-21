/*
 * @Author: bys
 * @Date: 2020-03-21 16:30:36
 * @Description: 数据类型的简易封装
 * @params:
*/
const Sequelize = require('sequelize');

module.exports = {
  STRING: Sequelize.STRING,      // 字符串，默认255字节
  DECIMAl: Sequelize.DECIMAL,    // 10进制整数
  TEXT: Sequelize.TEXT,          // 文本
  INTEGER: Sequelize.INTEGER,    // varchar 默认 255
  BOOLEAN: Sequelize.BOOLEAN,    // boolean
}