/*
 * @Author: bys
 * @Date: 2020-03-13 18:10:23
 * @Description: 环境变量
 * @params:
*/

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production',
  isTest: ENV === 'test'
}