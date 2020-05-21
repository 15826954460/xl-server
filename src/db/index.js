/**
 * @author 柏运送
 * @date 2020-04-13 15:34:01
 * @description 数据导出文件
*/

const Users = require('./module/user');
const Blogs = require('./module/blog');

/**
 * @description 创建表的外键关系
 * 写法一: a表 belongsto b表  => 查询结果，通过查询blog带出用户
 * 写法二: a表 hasMany b表 => 查询结果，通过查询用户带出blog
*/

Blogs.belongsTo(Users, {
  foreignkey: 'userId',   // 外键关联的key, 会将blog的userId关联到Users表
});

// Users.hasMany(Blogs, {
//   foreignkey: 'blogId',  // 会像Users表添加blogId 
// });

module.exports = {
  Users, Blogs,
}
