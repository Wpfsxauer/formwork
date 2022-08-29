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
const {
  gitCr,
  gitPush,
  gitDev,
  gitOl,
  gitPol,
  gitMerge,
  gitDel,
} = require("./gitcmd");

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
  .option("-p, --push <commit>", "your commit content")
  .option("-m, --merge")
  .option("-d, --dev")
  .option("-pr, --preOnline")
  .option("-o, --online")
  .option("-del, --del")
  .option("-cr, --create <branch>", "your branch")

  .action((options) => {
    const { name, push, online, dev, preOnline, merge, del, create } = options;
    if (name) fontLog(name);
    if (merge) gitMerge();
    if (push) gitPush(process.argv[process.argv.length - 1]);
    if (dev) gitDev();
    if (preOnline) gitPol();
    if (online) gitOl();
    if (del) gitDel();
    if (create) gitCr();
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
