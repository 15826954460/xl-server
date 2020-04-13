
function sum(a, b) {
  return a + b;
}

/**
  * @description test demo
  * test 不用定义，jest 默认生成
  * fun test(desc, fun)
  * @param {string} 字符串
  * @param {function}  函数 
  */
test('10 + 20 应该等于 30', () => {
  const res = sum(10, 20);
  expect(res).toBe(30);          // 期望输出结果
})

test('10 + 20 应该不等于 40', () => {
  const res = sum(10, 20);
  expect(res).not.toBe(40);          // 期望输出结果
})