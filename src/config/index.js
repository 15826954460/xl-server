const { isDev, isProd, isTest } = require('./env');

/*
 * @Author: bys
 * @Date: 2020-03-13 18:21:59
 * @Description: redis 配置
 * @params:
 */
let redisConfig = {
  prot: 6379, // 默认端口
  host: '127.0.0.1' // 本机域名地址
};

/*
 * @Author: bys
 * @Date: 2020-03-13 18:21:59
 * @Description: mysql 配置
 * @params:
 */
let mysqlConfig = {
  database: 'koa2_xl', // 数据库的名称
  username: 'root', // 用户名
  password: 'bys2020', // 数据库密码
  host: 'localhost', // 域名
  dialect: 'mysql', // 声明要操作的数据库
  port: 3306, // 默认端口
};

let localConfig = {
  port: 9999
}

if (isDev) {
  // 开发环境配置
} else if (isTest) {
  // 测试环境配置
} else if (isProd) {
  // 生产环境配置
  mysqlConfig.pool = {
    max: 5, // 连接池最大连接数量
    min: 0, // 连接池最小连接数量
    idle: 10000 // 如果一个连接池超过10秒钟没有被使用就释放
  }
};

module.exports = {
  mysqlConfig,
  redisConfig,
  localConfig
};
