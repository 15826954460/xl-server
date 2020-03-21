### 目录结构
```
src
  config                  //   配置文件
    constants             //   常量
    index                 //   数据库、redis、本地端口
    jwt                   //   JWT密钥
    env                   //   环境变量
  controller              //   针对业务的统一处理，返回统一的数据格式
    user                  //   针对用户的返回信息做统一处理
  module                  //   数据结构模型
    responseModule        //   接口返回的数据模型
  service                 //   针对数据库的操作统一处理
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
- cross-env                 跨平台环境设置
- pre-commit                结合eslint强制 commit 之前进行 eslint 代码检测
- koa2-cors                 解决服务端的跨域
- nodemon                   nodejs开发调试工具
- jest                      jest 单元测试
- supertest                 配合jest做单元测试
- passport-local            本地数据库配合 koa-passport 使用
- koa2-jwt                   jwt校验
- jsonwebtoken              json加密的第三方库

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


##### 
cd folder
npm init -y 生成package.json
git init 生成 .git 文件

