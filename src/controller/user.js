/**
 * @author bys
 * @date 2020-03-21 19:50:22
 * @description user controller
*/

const {
  getUserInfo, createUser, deleteUser, updateUser,
} = require('../services/user');
const { SuccessModule, ErrorModule } = require('../response/responseData');
const {
  userNameNotExist, userNameExist, registerFail, loginError, deleteUserFail,
  getSessionFail, updateUserInfoFail, updatePasswordFail,
} = require('../response/errorInfo');

/**
 * @description: 用户名是否存在
 * @param {string} userName
 */
async function isExist({ userName }) {
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

/**
 * @description 登陆
 * @param {string} userName  用户名
 * @param {string} passWord  密码
 * @param {object} ctx  koa2 ctx
 */
async function login({ ctx, userName, passWord }) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, passWord);
  if (!userInfo) {
    // 登陆失败
    return new ErrorModule(loginError);
  }

  // 登陆成功,设置session
  ctx.session.userInfo = { ...userInfo };
  // console.log(`登陆成功获取session`, ctx.session);

  return new SuccessModule({
    data: userInfo
  });
}

/**
 * @description 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurrentUser({ ctx, userName }) {
  const result = await deleteUser({ userName });
  if (result) {
    // 成功
    return new SuccessModule();
  } else {
    // 失败
    return new ErrorModule(deleteUserFail);
  }
}

/**
 * @description 获取session
 * @param {object} ctx koa2 ctx
 */
async function getSession({ ctx }) {
  const { userInfo } = ctx.session;
  if (userInfo) {
    return new SuccessModule(userInfo)
  } else {
    return new ErrorModule(getSessionFail);
  }
}

/**
 * @description 跟新用户信息
 * @param {object} ctx koa ctx
 * @param {string} nickName 昵称
 * @param {string} picture 图像
 * @param {string} city 城市
 */
async function updateUserInfo ({ ctx, nickName, picture, city }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  const result = await updateUser({ userName, nickName, picture, city });
  if (result) {
    ctx.session.userInfo = {
      ...ctx.session.userInfo,
      nickName,
      picture,
      city
    }
    return new SuccessModule({
      ...ctx.session.userInfo
    });
  }
  return new ErrorModule(updateUserInfoFail);
}

/**
 * @description 修改用户密码
 * @param {string} userName
 * @param {string} passWord
 * @param {string} newPassWord
 */
async function updatePassWord({ userName, passWord, newPassWord }) {
  const result = await updateUser({ userName, passWord, newPassWord });
  if (result) {
    return new SuccessModule();
  }
  return new ErrorModule(updatePasswordFail);
}

async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModule();
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  getSession,
  updateUserInfo,
  updatePassWord,
  logout,
}
