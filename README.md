### 目录结构
```
src
  cache                   //   redis缓存
    reids
  config                  //   配置文件
    constants             //   常量
    index                 //   数据库、redis、本地端口
    keys                  //   密钥
    env                   //   环境变量
  controller              //   针对业务的统一处理，返回统一的数据格式
    user                  //   针对用户的返回信息做统一处理
  db                      //   数据模型
    module                //   数据建模模块
  middleware
    validate              //   数据格式校验的中间件
  module                  //   数据结构模型
    errorInfo             //   统一定义错误信息
    responseModule        //   接口返回的数据模型
  plugin
  routes                  //   路由
    api                   //   接口层的路由
    views                 //   数据层路由
  seq                     //   sequelize
    async
    seq
    type
  service                 //   数据库操作处理
    _format               //   数据格式化返回默认值
  utils                   //   工具类函数
    crypto                //   md5加密
  validate
    _validate             //   数据格式校验
  test                    //   单元测是代码
  
```

#### 技术栈
- 数据库： Mysql
- 缓存：   Redis
- ORM:    sequelize
- 登陆：   cookie & session
- 加密：   jwt
- 服务端框架：koa2
- 前端页面编写：ejs 模板语法

#### 第三方依赖库
- mysql2                    koa链接mysql
- koa-redis                 koa链接redis库     
- koa-generic-session       kos生成session  链接：https://www.npmjs.com/package/
- koa2-cors                 解决服务端的跨域
- koa2-jwt                  jwt校验
- koa-body                  文件上传 http://www.ptbird.cn/koa-body.html
- cross-env                 跨平台环境设置
- pre-commit                结合eslint强制 commit 之前进行 eslint 代码检测
- nodemon                   nodejs开发调试工具
- jest                      jest 单元测试
- supertest                 配合jest做单元测试
- passport-local            本地数据库配合 koa-passport 使用
- jsonwebtoken              json加密的第三方库
- ajv                       数据格式检验库  
- fs-extra                  nodejs 的 fs 模块扩展


#### 命令说明
- "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors",
- --runInBand => 顺序执行
- --forceExit => 执行完强制退出
- --colors  => 输出带颜色的结果，增强可视化效果
- --coverage => 针对本次的测试进行全范围覆盖
- --watch => 监听，当文件修改后会自动进行测试

jest 测试用列 文件必须以 .test.js 结尾  格式为 xxx.test.js


#### 错误码说明
- 10001         统一的查询失败 eg：相关数据没有获取到

#### jwt postman 测试接口
headers 中添加 key: Authorization  value: 加密的tokan

#### 关于项目开发中遇到的一些问题
1、
2、服务端设置session成功，但是另一个接口获取不到设置到session中的数据
```js
// 服务端修改： cors 中间件设置
app.use(cors({
  credentials: true,
})

// 注意：前端必须要允许浏览器携带请求凭证，以客户端axios为例： withCredentials 要设置为 true
```


##### 
cd folder
npm init -y 生成package.json
git init 生成 .git 文件

