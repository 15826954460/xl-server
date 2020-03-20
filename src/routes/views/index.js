const jwt = require('jsonwebtoken');
const util = require('util'); // nodejs api
const verify = util.promisify(jwt.verify); // 自定义promise话函数
const { secret } = require('../../config/jwt');

module.exports = (router) => {
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

  /*
   * @Author: bys
   * @Date: 2020-03-20 10:30:39
   * @Description: 针对web 测试提供的测试接口
   * @params:
  */
  router.get('/web-test', async (ctx, next) => {
    ctx.body = {
      code: 0,
      data: {
        title: 'test',
      }
    }
  });

  /*
    * @Author: bys
    * @Date: 2020-03-20 10:15:00
    * @Description: 模拟获取用户信息
    * @url: https://www.npmjs.com/package/jsonwebtoken
    * @params: 
  */
  router.get('/getUserInfo', async (ctx, next) => {
    const token = ctx.header.authorization;
    console.log(token);
    try {
      const payload = await verify(token, secret);
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

  /*
   * @Author: bys
   * @Date: 2020-03-20 10:24:25
   * @Description: 模拟加密用户信息
   * @url: https://www.npmjs.com/package/jsonwebtoken
   * @params:
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
      let token = jwt.sign(userInfo, secret, { expiresIn: 60 * 60 });
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
}
