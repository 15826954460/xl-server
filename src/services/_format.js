/*
 * @Author: bys
 * @Date: 2020-03-21 20:14:26
 * @Description: 数据格式化
*/

const { DEFAULT_PICTURE } = require('../config/constants');

/**
 * 默认用户图像
 * @param {Object} obj 用户对象
 */
const _formatUserPicture = (obj) => {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE // 默认头像
  }
  return obj;
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 单个用户对象或者用户列表
 */
function formatUser(list) {
  // 不存在
  if (!list) {
    return list;
  }

  // 多个用户
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  // 单个用户
  return _formatUserPicture(list);
}

module.exports = {
  formatUser,
}