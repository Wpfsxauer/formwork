// 问题交互
const inquirer = require("inquirer");
// 执行文件操作
const shell = require("shelljs");

const commitTypeList = [
    {
        name: "新功能",
        type: "feat",
    },
    {
        name: "修复bug",
        type: "fix",
    },
    {
        name: "某个已有功能重构",
        type: "refactor",
    },
    {
        name: "性能优化",
        type: "perf",
    },
    {
        name: "代码格式改变",
        type: "style",
    },
    {
        name: "文档改变",
        type: "dosc",
    },
];

// 项目命令行选择列表
const commitList = [
    {
        type: "list",
        name: "name",
        message: "commit的类别",
        choices: commitTypeList,
        default: 0,
    },
];

const gitShell = async (desc) => {
    const res = await inquirer.prompt(commitList);
    const commitType = commitTypeList.filter((val) => val.name === res.name)[0];
    const commit = commitType.type + ":" + desc;
    shell.exec("git add .");
    shell.exec(`git commit -m "${commit}"`);
    shell.exec(`git pull`);
    shell.exec("git push");
};

module.exports = gitShell;
