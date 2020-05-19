/**
 * @author 柏运送
 * @date 2020-04-13 10:37:37
 * @description 用户相关的api接口测试
*/

const server = require('../server');

// 用户信息
const userName = `u_n_${Date.now()}`;
const passWord = `p_w_${Date.now()}`;
const testUserName = `t_u_n_test`;
const testPassWord = `t_p_w_test`;
const testUserInfo = {
  userName,
  passWord,
  gender: 1,
};

let COOKIE = '';

// json schema 检测
test('json schema 检测，格式不符合要求，应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUserInfo);
  expect(res.body.code).toBe(0);
});

// 注册
test('注册一个新用户，应该不成功,测试数据格式的时候已经注册', async () => {
  const res = await server.post('/api/user/register').send(testUserInfo);
  expect(res.body.code).not.toBe(0);
});

// 重复注册
test('重复注册一个用户，应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUserInfo);
  expect(res.body.code).not.toBe(0);
});

// 判断用户名是否存在
test('查询注册用户名，应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.code).toBe(0);
});

// 检测登陆
test('已注册用户登陆，应该成功', async () => {
  const res = await server.post('/api/user/login').send({ userName, passWord });
  expect(res.body.code).toBe(0);
  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// 修改用户信息
test('修改用户信息，应该成功', async () => {
  const res = await server.put('/api/user/updateUserInfo').set('cookie', COOKIE).send({
    nickName: testUserName,
    city: testPassWord,
    picture: 'test.png'
  });
  expect(res.body.code).toBe(0);
})

// 修改密码
test('修改密码，应该成功', async () => {
  const res = await server.put('/api/user/updatePassWord').set('cookie', COOKIE).send({
    passWord,
    newPassWord: `n_p_test`
  });
  expect(res.body.code).toBe(0);
})

// 删除当前用户
test('删除已登陆用户，应该成功', async () => {
  const res = await server.delete('/api/user/deleteCurrentUser').set('cookie', COOKIE).send();
  expect(res.body.code).toBe(0);
})

// 再次查询用户，应该失败
test('删除用户后，查询注册用户名，应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.code).not.toBe(0);
});

// 退出登陆
test('退出登陆应该成功', async () =>  {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE);
  expect(res.body.code).toBe(0);
})

// 再次检测登陆
test('再次登陆，应该失败', async () => {
  const res = await server.post('/api/user/login').send({ userName, passWord });
  expect(res.body.code).not.toBe(0);
})






