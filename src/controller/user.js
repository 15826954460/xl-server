/*
 * @Author: bys
 * @Date: 2020-03-21 19:50:22
 * @Description: user controller
 * @params:
*/

const { getUserInfo } = require('../services/user');
const { SuccessModule, ErrorModule } = require('../module/responseModule');
const { userNameNotExist } = require('../module/errorInfo');

/**
 * @Description: 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名存在
    return new SuccessModule(userInfo);
  } else {
    // 不存在
    return new ErrorModule(userNameNotExist)
  }
}


module.exports = {
  isExist,
}