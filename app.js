const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// const views = require('koa-views')
// const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const jwt = require('koa-jwt')

/*
 * @Author: bys
 * @Date: 2020-03-11 11:55:43
 * @Description: 引入第三方库的使用
*/
function resolve (dir) {
  return path.join(__dirname, dir)
}
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors')
const { redisConfig, localConfig } = require(resolve('/src/config'))
const secret = require(resolve('/src/config/jwt'))

// 路由
const testRoutes = require(resolve('/src/routes/views/test'))
const userViewsRoutes = require(resolve('/src/routes/views/user'))
const userApiRoutes = require(resolve('/src/routes/api/user'))

// 本地服务的端口
const port = process.env.PORT || localConfig.port

// 自定义环境变量
console.log(`当前环境 => ${process.env.NODE_ENV}`);

// error handler
const onerrorConfig = {
  redirect: '/error'
};

onerror(app, onerrorConfig)

/*
 * @Author: bys
 * @Date: 2020-03-20 15:15:59
 * @Description: 注册 cors 中间件 要放在接口请求之前
 * @params: {origin} string 设置允许来自指定域名请求
 * @params: {maxAge} number 指定本次预检请求的有效期，单位为秒
 * @params: {credentials} boolean 是否允许发送Cookie
 * @params: {allowMethods} array 设置所允许的HTTP请求方法
 * @params: {allowHeaders} array 设置服务器支持的所有头信息字段
 * @params: {exposeHeaders} array 设置获取其他自定义字段
*/
// 定义允许跨域的 origin
const allowOrigins = [
  'http://localhost:9090',
];
app.use(cors({
  origin: function(ctx) {
    if (allowOrigins.includes(ctx.header.origin)) {
      return ctx.header.origin;
    }
    return false;
  },
  maxAge: 5,
  credentials: false,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept',],
  exposeHeaders: ['token']
}));

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(resolve('/src/public')))
  .use(router.routes())
  .use(router.allowedMethods())
  
/*
 * @Author: bys
 * @Date: 2020-03-19 15:24:29
 * @Description: 注册jwt
 * @params: {unless} 排除不用验证接口
 * @url: 
*/
// app.use(jwt({ secret }).unless({ path: [/^\/login/, /^\/web-test/] }));

/*
 * @Author: bys
 * @Date: 2020-03-11 12:01:24
 * @Description: session配置
 * @params: {key} string cookie name 默认 koa.sid
 * @params: {prefix} string session prefix 默认 koa:sess
 * @params: {cookie} object
 * @params: {ttl} number 单位ms session 过期时间, 默认和 cookie 中的保持一致，如果不写cookie 只写ttl，session的过期时间将以ttl为准
 * @params: {store} object session 数据存储到redis中
 * 注: session 是否配置使用成功 命令行输入 redis-cli.exe enter keys * 
*/
const timeout = 24 * 60 * 60 * 1000
app.keys = ['UIsdf_7878#$']
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo:sess',
  cookie: {
    path: '/',                      // 定义访问路径 / => 表示所有的的都可以访问
    httpOnly: true,                 // 定义值允许服务端修改
    maxAge: timeout,                // 过期时间 单位 ms,
    overwrite: true,
    signed: true
  },
  // ttl: timeout,
  store: redisStore({
    all: `${redisConfig.host}:${redisConfig.port}`
  })
}))

// logger 自定义中间件演示
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
});

// routes
testRoutes(router)
userViewsRoutes(router)
userApiRoutes(router)


app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

app.listen(port, () => {
  console.log(`Listening on http://192.168.1.5:${localConfig.port}`)
});

module.exports = app;
