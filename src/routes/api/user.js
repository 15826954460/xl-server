/**
 * @author 柏运送
 * @date 2020-03-21 19:42:47
 * @description user Api 路由
 */

const {
  isExist, register, login, deleteCurrentUser
} = require('../../controller/user');

const { isPro } = require('../../config/env');

const { userValidate } = require('../../validate/user');
const { genValidate } = require('../../middlewares/validate');
const { loginCheck } = require('../../middlewares/loginChecks');

module.exports = (router) => {
  router.prefix('/api/user');

  // 登陆
  router.post('/login', async (ctx, next) => {
    const { userName, passWord } = ctx.request.body;
    ctx.body = await login({ ctx, userName, passWord });
  });

  // 注册(中间件校验用户输入的数据格式)
  router.post('/register', genValidate(userValidate), async (ctx, next) => {
    const { userName, passWord, gender } = ctx.request.body;
    ctx.body = await register({ userName, passWord, gender });
  });

  // 判断用户名是否存在
  router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist({ userName });
  })

  // 删除当前用户，只有在非生产环境下生效
  router.post('/deleteCurrentUser', loginCheck, async (ctx, next) => {
    if (isPro) return;
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurrentUser({ userName })
  })

  // 测试登陆验证的接口
  router.post('/test', loginCheck, async (ctx, next) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '登陆成功'
      }
    };
  })
}
