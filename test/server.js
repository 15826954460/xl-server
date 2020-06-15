/**
 * @author 柏运送
 * @date 2020-04-13 10:34:06
 * @description 引入koa
*/

const supertest = require('supertest');
const server = require('../app').callback();

module.exports = supertest(server);
