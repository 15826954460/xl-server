/*
 * @Author: bys
 * @Date: 2020-03-12 17:03:04
 * @Description: 数据同步到数据库
 * @params:
 */
const seq = require('./seq');

require('../db/index'); // 引入数据模型

// 测试链接数据是否成功
seq.authenticate().then(() => {
  console.log('auth ok');
}).catch(err => {
  console.log('auth err');
})

/*
 * @Author: bys
 * @Description: 执行同步,将module.js中的 表同步到 mysql
 * @Date: 2020-03-08 20:19:14
 * @params: {
 *  force: true: 表示强行同步，每次都会生成新的数据, 但是针对有外键关联的表会 报错
 * }
 */
// seq.sync({
//   force: false
// }).then(() => {
//   console.log('sync ok');
//   process.exit(); // 退出程序
// })
