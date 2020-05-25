/**
 * @author 柏运送
 * @date 2020-04-12 20:27:51
 * @description 数据模型测试
*/

const { Blogs } = require('../../src/db/index');

test('Blogs 模型的各个属性', () => {
  // 创建一个新的模型实例
  const blogs = Blogs.build({
    comment: 'content test',
    userId: 1,
  });

  expect(blogs.comment).toBe('content test');
  expect(blogs.userId).toBe(1);
})