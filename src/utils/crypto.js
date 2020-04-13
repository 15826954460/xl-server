/**
 * @author 柏运送
 * @date 2020-03-26 15:13:33
 * @description: md5 加密
 */

const crypto = require('crypto');
const {
  CRYTPO_SECRET_KEY
} = require('../config/keys');

/**
 * @param {string} content 明文
 */
function _md5(content) {
  const hash = crypto.createHash('md5')
    .update(content)
    .digest('hex');
  return hash;
}

/**
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `passward=${content}&crypto_srcret_key=${CRYTPO_SECRET_KEY}`;
  return _md5(str);
}

module.exports = doCrypto;
