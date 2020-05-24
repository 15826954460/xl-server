/**
 * @author 柏运送
 * @date 2020-05-21 20:52:16
 * @description 博客数据模型
*/
const Seq = require('../seq');
const { STRING, TEXT, INTEGER } = require('../seq/type');

const Blogs = Seq.define('blogs', {
  id: {
    type: INTEGER,              // 类型 整数
    primaryKey: true,           // 主键
    allowNull: false,           // 是否允许为null
    autoIncrement: true,        // 自动递增,默认为false
    comment: '用户id',           // 描述说明
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  comment: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容',
  },
}, {
  timestamps: true,       // 创建时间
  freezeTableName: true,  // 不使用seq规则改变表名
});

module.exports = Blogs;