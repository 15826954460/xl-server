/**
 * @author 柏运送
 * @date 2020-05-24 23:01:27
 * @description 博客相关的接口测试
*/

const server = require('../server');

const userName = `u_n_${Date.now()}`;
const passWord = `p_w_${Date.now()}`;
// 用户信息
const testUserInfo = {
  userName,
  passWord,
  gender: 1,
};

let COOKIE = '';
let BLOG_ID = '';

// 创建博客
const blogInfo = {
  id: 1,
  comment: 'test string'
}

// 注册
test('注册一个新用户，应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUserInfo);
  expect(res.body.code).toBe(0);
});

// 检测登陆
test('已注册用户登陆，应该成功', async () => {
  const res = await server.post('/api/user/login').send({ userName, passWord });
  expect(res.body.code).toBe(0);
  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

test('登陆用户创建博客应该成功', async () => {
  const res = await server.post('/api/blog/create').set('cookie', COOKIE).send(blogInfo);
  expect(res.body.code).toBe(0);
  // 保存当前博客id
  BLOG_ID = res.body.data.id;
})



