#!/usr/bin/env node

// 处理用户输入的命令
const { program } = require("commander");
// 问题交互
const inquirer = require("inquirer");
//package
const package = require("./package.json");
// 引入模板文件
const { templateList, templateHandle } = require("./template/index");
//工具函数
const { promisify } = require("util");
// 字符画
const figlet = promisify(require("figlet"));
// 清屏
const clear = require("clear");
// 改变输出log颜色的工具
const chalk = require("chalk");
// 执行文件操作
const shell = require("shelljs");
//git命令
const { gitPush, gitDev, gitOl, gitPol, gitMerge } = require("./gitcmd");

const fontLog = async (options) => {
  clear();
  const name = await figlet(options);
  console.log(chalk.green(name));
};

// 命令行选择列表
const prompList = [
  {
    type: "list",
    name: "name",
    message: "请选择你想要生成的项目？",
    choices: templateList,
    default: 0,
  },
];

program
  .version(package.version, "-v, --version")
  .option("-n, --name <name>", "your name")
  .option("-m, --commit <commit>", "your commit content")
  .option("-d, --dev")
  .option("-o, --online")
  .option("-p, --preOnline")
  .option("-m, --merge")

  .action((options) => {
    const { name, commit, online, dev, preOnline, merge } = options;
    if (name) fontLog(name);
    if (commit) gitPush(process.argv[process.argv.length - 1]);
    if (merge) gitMerge()
    if (online) gitOl()
    if (dev) gitDev()
    if (preOnline) gitPol()
  });

program
  .command("init <filename>")
  .description("初始化项目")
  .action(async (filename) => {
    const res = await inquirer.prompt(prompList);
    const { url } = templateList.filter((val) => val.name === res.name)[0];
    templateHandle(url, filename);
  });

// 处理命令行输入的参数
program.parse(process.argv);
