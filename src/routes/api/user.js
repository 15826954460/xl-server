/*
 * @Author: bys
 * @Date: 2020-03-21 19:42:47
 * @Description: user Api 路由
 */

const {
  isExist, register, login 
} = require('../../controller/user');

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
