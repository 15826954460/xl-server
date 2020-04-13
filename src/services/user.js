/*
 * @Author: bys
 * @Date: 2020-03-21 20:01:44
 * @Description: user services
*/

const { Users } = require('../db/index');
const { formatUser } = require('./_format');
const { doCrypto } = require('../utils');

/**
 * @description: 获取用户信息
 * @param {string} userName 
 * @param {string} passWord 
 */
async function getUserInfo(userName, passWord) {
  // 判定用户名是否存在的查询条件
  const queryOpt = {
    userName
  }
  // 判断登陆是否成功的查询条件
  if (passWord) {
    Object.assign(queryOpt, { passWord: doCrypto(passWord) });
  }

  // 查询用户信息
  const result = await Users.findOne({
    attributes: [
      'id', 'userName', 'nickName', 'picture', 'city'
    ],                                                             // 查询信息
    where: queryOpt,                                               // 查询条件
  })

  if (result === null) {
    return result;
  }

  // 格式化处理
  const formatResult =  formatUser(result.dataValues);

  return formatResult;
}

/**
 * @description 创建用户
 * @param {string} userName         用户名
 * @param {string} passWord         密码
 * @param {string|number} gender    性别 1 男 2 女 3 保密
 */
async function createUser({ userName, passWord, gender = 3, nickName }) {
  // 创建用户
  const result = await Users.create({
    userName,
    passWord: doCrypto(passWord),
    gender,
    nickName: nickName ? nickName : userName
  });
  return result.dataValues;
}

/**
 * @description 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await Users.destroy({
    where: {
      userName
    }
  });
  // 返回删除的行数
  return result > 0;
}


module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}