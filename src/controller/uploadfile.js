/**
 * @author 柏运送
 * @date 2020-04-14 16:02:20
 * @description file upload controller
*/

const fs = require('fs-extra');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

const MAX_SIZE = 5 * 1024 * 1024; // 文件大小限制5M
const TAGGET_FOLDER_PATH = resolve('../../uploadFiles'); // 目标文件夹

const { SuccessModule, ErrorModule } = require('../module/responseModule');
const { 
  fileSizeOverMaxSize
} = require('../module/errorInfo');

/**
 * @description 创建文件夹
 * @param {*}
*/
async function pathExists () {
  const exists = await fs.pathExists(TAGGET_FOLDER_PATH)
  // 文件夹不存在，创建文件夹
  if (!exists) {
    try {
      await fs.ensureDir(TAGGET_FOLDER_PATH)
      console.log('新建文件夹 success!')
    } catch (err) {
      console.error('新建文件夹 err')
    }
  }
};

pathExists();

async function saveFile({ size, path, name, type }) {
  if (size > MAX_SIZE) {
    await fs.remove(path, err => {
      // 文件删除失败
      if (err) {
        console.error(err);
        return;
      }
      // 文件删除成功
      console.log('success!')
    });
    return new ErrorModule(fileSizeOverMaxSize)
  }

  /**
   * @description 文件移动
   * 实际开发中，会将文件上传到公司的文件服务 / CDN 然后件返回的url保存到数据库，然后再返回给前端使用
   * 演示代码中的前端上传文件目前都放在 uploadFiles 文件夹下
  */
  const fileName = `xlweb_${Date.now()}.${name}`; // 文件重命名
  const TAGGET_FILE_PATH = resolve(`../../uploadFiles/${fileName}`); // 目标文件
  await fs.move(path, TAGGET_FILE_PATH); // 移动到目标路径

  // 返回文件路径, 这个只做演示，返回百度的logo
  return new SuccessModule({ url: `//www.baidu.com/img/baidu_jgylogo3.gif` });
}

module.exports = {
  saveFile,
}