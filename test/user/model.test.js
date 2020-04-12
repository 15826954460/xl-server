/**
 * @Author bys
 * @Date 2020-04-12 20:27:51
 * @description 数据模型测试
*/

const { Users } = require('../../src/db/index');

test('Users 模型的各个属性', () => {
  // 创建一个新的模型实例
  const user = Users.build({
    userName: 'zhangsan',
    passWord: 'abc',
    nickName: '张三',
    // gender: 1
    picture: '/xxx.png',
    city: '武汉',
  });

  expect(user.userName).toBe('zhangsan');
  expect(user.passWord).toBe('abc');
  expect(user.nickName).toBe('张三');
  expect(user.gender).toBe(3); // 测试默认值
  expect(user.picture).toBe('/xxx.png');
  expect(user.city).toBe('武汉');
})