/**
 * @author 柏运送
 * @date 2020-03-13 18:10:23
 * @description 环境变量
*/

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production',
  isTest: ENV === 'test'
}