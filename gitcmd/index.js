// 问题交互
const inquirer = require("inquirer");
// 执行文件操作
const shell = require("shelljs");
// 清屏
const clear = require("clear");

const gitBranch = async () => {
  const outstr = await shell.exec(`git branch -a`);
  clear()
  const list = outstr.stdout.split(/\n/).reduce((pre, cur) => {
    const reg = /origin\//;
    const matchList = cur.split(reg);
    const match = matchList[matchList.length - 1].replace(/\*/, "").trim();
    if (match && !pre.includes(match)) {
      pre.push(match);
    }
    return pre;
  }, []);

  return list
}

const gitMerge = async () => {
  const list = await gitBranch()
  const selectBr = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "请选择你想要合并的环境？",
      choices: list,
      default: 0,
    },
  ]);
  shell.exec(`git merge ${selectBr.name}`)
  shell.exec(`git push`)
}

const gitPush = async (desc) => {
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

  const res = await inquirer.prompt(commitList);
  const commitType = commitTypeList.filter((val) => val.name === res.name)[0];
  const commit = commitType.type + ": " + desc;
  shell.exec("git add .");
  shell.exec(`git commit -m "${commit}"`);
  shell.exec(`git pull`);
  shell.exec("git push");
};

const gitDev = async () => {
  const templateList = Array.from({ length: 5 }, (item, index) => `stage0${index + 1}`)
  const res = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "请选择你想要部署的环境？",
      choices: templateList,
      default: 0,
    },
  ]);

  const list = await gitBranch()
  list.includes(res.name) ? shell.exec(`git checkout ${res.name}`) : shell.exec(`git checkout -b ${res.name}`)
  shell.exec(`git pull`)

  await gitMerge()
};

const gitOl = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "确定要上线吗？",
      choices: ["确定", "取消"],
      default: 0,
    },
  ]);

  if (name === "取消") return
  const list = await gitBranch()
  if (!list.includes("beta")) {
    console.error("上线失败，请先创建beta分支～")
    return
  }
  shell.exec(`git checkout beta`)
  shell.exec(`git pull`)
  shell.exec(`git checkout master`)
  shell.exec(`git pull`)
  shell.exec(`git merge beta`)
  shell.exec(`git push`)

  shell.exec(`git branch -D beta`)
  shell.exec(`git push origin --delete beta`)

  const { time } = require("../utils/time")
  const tagName = `v${time}`
  shell.exec(`git tag ${tagName}`)
  shell.exec(`git push origin ${tagName}`)
};

const gitPol = async () => {
  const list = await gitBranch()
  if (list.includes("beta")) {
    shell.exec(`git checkout beta`)
    shell.exec(`git pull`)
  } else {
    shell.exec(`git checkout master`)
    shell.exec(`git pull`)
    shell.exec(`git checkout -b beta`)
  }
  await gitMerge()
};

module.exports = {
  gitPush,
  gitDev,
  gitOl,
  gitPol,
  gitMerge
};
