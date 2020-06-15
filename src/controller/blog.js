/**
 * @author 柏运送
 * @date 2020-05-24 21:54:33
 * @description
*/
const { createBlog } = require('../services/blog');
const { SuccessModule, ErrorModule } = require('../response/responseData');
const { createBlogFail } = require('../response/errorInfo');

async function create({ comment, userId }) {
  try {
    const blog = await createBlog({ comment, userId });
    return new SuccessModule(blog);
  } catch (err) {
    console.log(`创建博客失败：${err.stack} ${err.message}`);
    return new ErrorModule(createBlogFail);
  }
}


module.exports = {
  create,
}
