/**
 * @author 柏运送
 * @date 2020-04-14 15:54:53
 * @description 文件上传api
 */

const Router = require('koa-router');
const router = new Router();


const { sessionCheck } = require('../../middlewares/loginChecks');
const { saveFile } = require('../../controller/uploadfile');

// 设置路由前缀
router.prefix('/api/file');

router.post('/fileUpload', sessionCheck, async (ctx, next) => {
  // 单个文件，返回文件对象，多个文件 返回列表
  const file = ctx.request.files.file;
  if (!file) {
    ctx.body = {
      code: 0,
      msg: 'file 对象不存在'
    }
  }
  const { size, path, name, type } = file;
  ctx.body = await saveFile({ size, path, name, type })
})

module.exports = router;