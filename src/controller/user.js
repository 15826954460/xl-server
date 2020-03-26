/*
 * @author: bys
 * @date: 2020-03-21 19:50:22
 * @description: user controller
*/

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModule, ErrorModule } = require('../module/responseModule');
const { userNameNotExist, userNameExist, registerFail } = require('../module/errorInfo');

/**
 * @description: 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名存在
    return new SuccessModule(userInfo);
  } else {
    // 不存在
    return new ErrorModule(userNameNotExist)
  }
}

/**
 * @description: 注册接口
 * @param {*} userName 
 * @param {*} passWord 
 * @param {*} gender 
 */
async function register({ userName, passWord, gender }) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return new ErrorModule(userNameExist);
  }

  // 用户名不存在，创建用户
  try {
    // 创建用户成功
    await createUser({ userName, passWord, gender });
    return new SuccessModule();
  } catch (err) {
    // 创建用户失败
    console.error(`创建用户失败：${err.message} ==== ${err.stack}`);
    return new ErrorModule(registerFail);
  }
}

module.exports = {
  isExist,
  register,
}