/**
 * @Author bys
 * @Date 2020-03-11 11:55:43
 * @Description koa 入口文件
*/

const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const debug = require('debug')('koa2:server');
const jwt = require('koa-jwt');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
// const views = require('koa-views')
// const co = require('co')

const path = require('path');

const app = new Koa();
const router = new Router();

function resolve (dir) {
  return path.join(__dirname, dir);
}
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const cors = require('koa2-cors');
const { redisConfig, localConfig } = require(resolve('/src/config'));
const { SESSION_SECRET_KEY, JWT_SECRET_KEY } = require(resolve('/src/config/keys'));

// 路由
const testRoutes = require(resolve('/src/routes/views/test'));
const userViewsRoutes = require(resolve('/src/routes/views/user'));
const userApiRoutes = require(resolve('/src/routes/api/user'));
const blogApiRoutes = require(resolve('/src/routes/api/blog'));
const uploadfileApiRoutes = require(resolve('/src/routes/api/uploadfile'));

// 本地服务的端口
const port = process.env.PORT || localConfig.port;

// 自定义环境变量
console.log(`当前环境 => ${process.env.NODE_ENV}`);

// error handler
const onerrorConfig = {
  redirect: '/error',
};

onerror(app, onerrorConfig);
/**
 * @description 注册 cors 中间件
 * @param {origin} string 设置允许来自指定域名请求
 * @param {maxAge} number 指定本次预检请求的有效期，单位为秒
 * @param {credentials} boolean 是否允许发送Cookie
 * @param {allowMethods} array 设置所允许的HTTP请求方法
 * @param {allowHeaders} array 设置服务器支持的所有头信息字段
 * @param {exposeHeaders} array 设置获取其他自定义字段
 */

// 定义允许跨域的 origin
const allowOrigins = [
  'http://localhost:9090',
];
app.use(cors({
  origin: function(ctx) {
    return ctx.header.roigin;
    // if (allowOrigins.includes(ctx.header.origin)) {
    //   return ctx.header.origin;
    // }
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DEL'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept',],
  exposeHeaders: ['token'],
}));

// middlewares app.use 返回 this => new Koa()
app
  // .use(bodyparser())
  .use(json())
  .use(logger())
  .use(koaStatic(resolve('/src/public')))
  .use(koaBody({ multipart: true }));

/**
 * @description 注册jwt
 * @param {unless} 排除不用验证接口
 */
// app.use(jwt({ JWT_SECRET_KEY }).unless({ path: [/^\/login/, /^\/web-test/] }));

/**
 * @description session配置
 * @param {key} string cookie name 默认 koa.sid
 * @param {prefix} string session prefix 默认 koa:sess
 * @param {cookie} object
 * @param {ttl} number 单位ms session 过期时间, 默认和 cookie 中的保持一致，如果不写cookie 只写ttl，session的过期时间将以ttl为准
 * @param {store} object session 数据存储到redis中
 * 注: session 是否配置使用成功 命令行输入 redis-cli.exe enter keys *
*/
const EXPIRSES_TIME = 24 * 60 * 60 * 1000;
app.keys = [SESSION_SECRET_KEY]; // 签名的cookie的密钥数组
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo:sess',
  cookie: {
    path: '/',                      // 定义访问路径 / => 表示所有的的都可以访问
    httpOnly: true,                 // 定义只允许服务端修改
    maxAge: EXPIRSES_TIME,          // 过期时间 单位 ms,
    overwrite: true,
    signed: true
  },
  // ttl: timeout,
  store: redisStore({
    all: `${redisConfig.host}:${redisConfig.port}`
  })
}));

// logger 自定义中间件演示
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - $ms`);
});

// routes
app.use(userViewsRoutes.routes()).use(userViewsRoutes.allowedMethods());

app.use(userApiRoutes.routes()).use(userApiRoutes.allowedMethods());
app.use(blogApiRoutes.routes()).use(blogApiRoutes.allowedMethods());
app.use(uploadfileApiRoutes.routes()).use(uploadfileApiRoutes.allowedMethods());

app.use(testRoutes.routes()).use(testRoutes.allowedMethods());


app.on('error', function(err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});

app.listen(port, () => {
  console.log(`Listening on localhost:${localConfig.port}`);
  console.log(`Listening on http://192.168.5.13:${localConfig.port}`);
});

module.exports = app;
