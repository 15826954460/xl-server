/**
 * @author 柏运送
 * @date 2020-03-12 15:57:00
 * @description sequelize 实例
 */
const Sequelize = require('sequelize');
const {
  mysqlConfig
} = require('../../config');

const {
  isProd,
  isTest
} = require('../../config/env');

// 结构赋值
const {
  database,
  username,
  password,
  ...conf
} = mysqlConfig;

/**
 * @description: 测试环境或者生产环境关闭 sequelize 的日志打印
 */
if (isProd || isTest) {
  conf.logging = () => {}
}

// 新建一个sequelize链接数据库 [数据库名，用户名， 密码]
const seq = new Sequelize(database, username, password, conf);

// 测试链接数据是否成功
// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch(err => {
//     console.log('err');
// })

module.exports = seq;
