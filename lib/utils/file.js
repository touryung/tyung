const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

/**
 * 编译 ejs 模板
 * @param {*} templateName
 * @param {*} data
 * @returns
 */
const ejsCompile = (templateName, data) => {
  const templatePath = path.resolve(__dirname, `../templates/${templateName}`);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, {}, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

/**
 * 递归创建文件夹
 * @param {*} pathName source/components/category
 * @returns
 */
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) return true;

  // 当前路径不存在，判断父路径是否存在
  if (createDirSync(path.dirname(pathName))) {
    // 父路径存在，直接创建当前文件夹
    fs.mkdirSync(pathName);
    return true;
  }
};

/**
 * 写入文件
 * @param {*} path
 * @param {*} content
 * @returns
 */
const writeToFile = (path, content) => fs.promises.writeFile(path, content);

module.exports = {
  ejsCompile,
  createDirSync,
  writeToFile,
};
