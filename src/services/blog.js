/**
 * @author 柏运送
 * @date 2020-05-24 22:15:11
 * @description blog services
*/

const { Blogs } = require('../db/index');

/**
 * @description 创建博客
 * @param {*} 
*/
async function createBlog({ comment, userId }) {
  const result = await Blogs.create({
    comment,
    userId
  });
  return result.dataValues;
}

module.exports = {
  createBlog,
}