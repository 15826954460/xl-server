/**
 * @author 柏运送
 * @date 2020-04-13 15:40:10
 * @description jwt 测试
*/

const Router = require('koa-router');
const router = new Router();

const jwt = require('jsonwebtoken');
const util = require('util'); // nodejs api
const verify = util.promisify(jwt.verify); // 自定义promise话函数
const { JWT_SECRET_KEY } = require('../../config/keys');


// 首页
router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'koas json',
  }
});

// session test
router.get('/session', async (ctx, next) => {
  const session = ctx.session;
  if (!session.viewNum) {
    session.viewNum = 0;
  }
  session.viewNum+=1;
  ctx.body = {
    title: 'koas json',
    viewNum: session.viewNum,
  }
});

/**
 * @description 针对web 测试提供的测试接口
*/
router.get('/web-test', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: {
      title: 'test 666',
    }
  }
});

/**
  * @description 模拟获取用户信息
  * @url 学习文档 https://www.npmjs.com/package/jsonwebtoken
*/
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization;
  try {
    const payload = await verify(token, JWT_SECRET_KEY);
    ctx.body = {
      code: -1,
      data: payload,
    }
  } catch(err) {
    console.log(err);
    ctx.body = {
      code: -1,
      msg: 'Token verify failed'
    }
  }
})

/**
 * @description 模拟加密用户信息
 * @url 学习文档 https://www.npmjs.com/package/jsonwebtoken
*/
router.post('/login', async (ctx, next) => {
  const { userName, passWord } = ctx.request.body;
  if (userName === 'test' && passWord === 'test') {
    let userInfo = {
      userName,
      userId: 1,
      nickName: 'test',
      gender: 1, // 1 => 男 0 => 女
    }
    let token = jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
    ctx.body = {
      code: 0,
      data: token,
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登陆失败'
    }
  }
})

module.exports = router;
