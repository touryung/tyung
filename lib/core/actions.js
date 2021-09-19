const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

const download = promisify(require("download-git-repo"));
const open = require("open");

const { vueRepo } = require("../config/repo");
const runCommand = require("../utils/runCommand");
const { ejsCompile, createDirSync, writeToFile } = require("../utils/file");

/**
 * 创建项目
 * @param {*} project
 */
const createAction = async (project) => {
  console.log("🛠️ tyung is creating your project, please wait...");

  // 1. clone 模板
  console.log("\nrunning clone...");
  await download(`direct:${vueRepo}`, project, { clone: true });

  // 2. 运行 npm install
  console.log("\nrunning install...");
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  await runCommand(npm, ["install"], { cwd: project });

  // 3. 打开浏览器
  open("http://localhost:8080");

  // 4. 运行 npm run serve
  console.log("\nrunning serve...");
  // 因为 serve 一直在执行，所以使用 await 会阻塞后续代码运行
  await runCommand(npm, ["run", "serve"], { cwd: project });
};

/**
 * ejs 模板编译并写入到文件
 * @param {*} name
 * @param {*} target
 * @param {*} template
 * @param {*} filename
 */
const handleEjsToFile = async (name, target, template, filename) => {
  // 1. 编译 ejs 模板
  const result = await ejsCompile(template, {
    name,
    lowerName: name.toLowerCase(),
  });

  // 2. 写入文件，如果路径不存在则创建文件夹
  createDirSync(target);
  const targetPath = path.resolve(target, filename);
  await writeToFile(targetPath, result);
};

/**
 * 添加组件
 * @param {*} name
 * @param {*} target
 */
const addComponentAction = async (name, target) => {
  handleEjsToFile(name, target, "vue-component.ejs", `${name}.vue`);
};

/**
 * 添加页面
 * @param {*} name
 * @param {*} target
 */
const addPageAction = async (name, target) => {
  addComponentAction(name, target);
  handleEjsToFile(name, target, "vue-route.ejs", `route.js`);
};

/**
 * 添加 store
 * @param {*} name
 * @param {*} target
 */
const addStoreAction = async (name, target) => {
  handleEjsToFile(name, target, "vue-store.ejs", `index.js`);
  handleEjsToFile(name, target, "vue-types.ejs", `types.js`);
};

module.exports = {
  createAction,
  addComponentAction,
  addPageAction,
  addStoreAction,
};
