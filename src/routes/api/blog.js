/**
 * @author 柏运送
 * @date 2020-05-24 21:47:24
 * @description blog Api 路由
*/

const Router = require('koa-router');
const router = new Router();

const { create } = require('../../controller/blog');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/blog');

// 创建博客
router.post('/create', loginCheck, async (ctx, next) => {
  const { comment } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await create({ comment, userId });
})

module.exports = router;