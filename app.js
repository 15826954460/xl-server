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
const cors = require('koa-cors')
const { redisConfig, localConfig } = require(resolve('/src/config'))

// 路由
const indexRoutes = require(resolve('/src/routes/views/index'))

// 本地服务的端口
const port = process.env.PORT || localConfig.port

// 自定义环境变量
console.log(`当前环境 => ${process.env.NODE_ENV}`);

// error handler
const onerrorConfig = {
  redirect: '/error'
}
onerror(app, onerrorConfig)

// middlewares
app.use(bodyparser()).use(json()).use(logger())

// 将public用做静态资源目录来访问
app.use(require('koa-static')(resolve('/src/public')))

// 通过注册中间件来识别ejs
// app.use(views(resolve('/src/views'), {
//   options: {settings: {views: resolve('/src/views')}},
//   map: {'ejs': 'ejs'},
//   extension: 'ejs'
// }))

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
})

app.use(cors()) // 注册跨域的中间件
/*
 * @Author: bys
 * @Date: 2020-03-11 17:24:58
 * @Description: 路由中间件, 链式调用
*/
app.use(router.routes()).use(router.allowedMethods())

// routes
indexRoutes(router)

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${localConfig.port}`)
});

module.exports = app;
