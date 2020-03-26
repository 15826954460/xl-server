/*
 * @Author: bys
 * @Date: 2020-03-21 16:20:34
 * @Description: 用户数据模型
 * @url: https://www.cnblogs.com/zzsdream/p/11088678.html
 */
const Seq = require('../../seq/seq');
const { STRING, DECIMAl, INTEGER } = require('../../seq/type')

const Users = Seq.define('users', {
  id: {
    type: INTEGER,              // 类型 整数
    primaryKey: true,           // 主键
    allowNull: false,           // 是否允许为null
    autoIncrement: true,        // 自动递增,默认为false
  },
  userName: {
    type: STRING,               // 字符串类型
    allowNull: false,           // 不允许为空
    unique: true,               // 唯一性约束
    comment: '用户名唯一'        // 注释
  },
  passWord: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: true,
    comment: '用户昵称',        // 通过comment字段添加注释
  },
  gerder: {
    type: DECIMAl,
    allowNull: false,
    defaultValue: 3,           // 默认值
    comment: '性别(1 男 2 女 3 保密)'
  },
  picture: {
    type: STRING,
    allowNull: true,
    comment: '图像(图片地址)'
  },
  city: {
    type: STRING,
    allowNull: true,
    comment: '城市'
  }
}, {
  timestamps: true,       // 创建时间
  freezeTableName: true,  // 不使用seq规则改变表名
});

module.exports = Users;