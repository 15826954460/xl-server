/*
 * @Author: bys
 * @Date: 2020-03-12 15:57:00
 * @Description: sequelize 实例
 * @params:
 */
const Sequelize = require('sequelize');
const {
  mysqlConfig
} = require('../config');

const {
  isProd,
  isTest
} = require('../utils/env');

// 结构赋值
const {
  database,
  username,
  password,
  ...conf
} = mysqlConfig;

/*
 * @Author: bys
 * @Date: 2020-03-12 16:47:47
 * @Description: 测试环境或者生产环境关闭 sequelize 的日志打印
 * @params:
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
