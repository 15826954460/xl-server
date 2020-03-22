/*
 * @Author: bys
 * @Date: 2020-03-21 20:01:44
 * @Description: user services
*/

const { Users } = require('../db/index');
const { formatUser } = require('./_format');

/**
 * @Description: 获取用户信息
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
    Object.assign(queryOpt, { passWord });
  }

  // 查询数据库
  const result = await Users.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'], // 查询信息
    where: queryOpt,                                               // 查询条件
  })

  if (result === null) {
    return result;
  }

  // 格式化处理
  const formatResult =  formatUser(result.dataValues);

  return formatResult;
}

module.exports = {
  getUserInfo
}