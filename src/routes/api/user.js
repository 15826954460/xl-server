/*
 * @Author: bys
 * @Date: 2020-03-21 19:42:47
 * @Description: user Api 路由
 */

const { isExist } = require('../../controller/user');
module.exports = (router) => {
  router.prefix('/api/user');

  // 登陆
  router.get('/login', (ctx, next) => {
    ctx.body = {
      code: 0,
      data: {

      }
    }
  });

  // 注册
  router.post('/regiseter', (ctx, next) => {
    ctx.body = {
      code: 0,
      data: {

      }
    }
  });

  // 判断用户名是否存在
  router.post('/isExit', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
  })
}
