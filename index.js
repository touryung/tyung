#!/usr/bin/env node
const { program } = require("commander");
const pkg = require("./package.json");

const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 设置基本信息
program.name("tyung").version(pkg.version);

// 设置参数，生成 help 文档
helpOptions(program);

// 设置命令
createCommands(program);

// 解析参数
program.parse(process.argv);
