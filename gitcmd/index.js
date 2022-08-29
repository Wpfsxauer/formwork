// 问题交互
const inquirer = require("inquirer");
// 执行文件操作
const shell = require("shelljs");
// 清屏
const clear = require("clear");

const typeList = [
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

const gitCr = async () => {
  const res = await inquirer.prompt(commitList);
  const type = typeList.filter((val) => val.name === res.name)[0];
  const branch = `${type.type}/${desc}`;
  shell.exec(`git checkout -b "${branch}"`);
}

const gitBranch = () => {
  const outstr = shell.exec(`git branch -a`);
  clear();

  const list = outstr.stdout.split(/\n/).reduce((pre, cur) => {
    const reg = /origin\//;
    const matchList = cur.split(reg);
    const match = matchList[matchList.length - 1].replace(/\*/, "").trim();
    if (match && !pre.includes(match)) {
      pre.push(match);
    }
    return pre;
  }, []);

  return list;
};

const gitMerge = async () => {
  const list = gitBranch();
  const selectBr = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "请选择你想要合并的环境？",
      choices: list,
      default: 0,
    },
  ]);

  shell.exec(`git merge ${selectBr.name}`);
  shell.exec(`git push`);
};

const gitPush = async (desc) => {
  // 项目命令行选择列表
  const commitList = [
    {
      type: "list",
      name: "name",
      message: "commit的类别",
      choices: typeList,
      default: 0,
    },
  ];

  const res = await inquirer.prompt(commitList);
  const commitType = typeList.filter((val) => val.name === res.name)[0];
  const commit = commitType.type + ": " + desc;
  shell.exec("git add .");
  shell.exec(`git commit -m "${commit}"`);
  shell.exec(`git pull`);
  shell.exec("git push");
};

const gitDev = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "请选择你想要部署的环境？",
      choices: Array.from({ length: 5 }, (item, index) => `stage0${index + 1}`),
      default: 0,
    },
  ]);

  if (gitBranch().includes(name)) {
    shell.exec(`git checkout ${name}`);
    shell.exec(`git pull`);
  } else {
    shell.exec(`git checkout master`);
    shell.exec(`git pull`);
    shell.exec(`git checkout -b ${name}`);
  }

  await gitMerge();
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

  if (name === "取消") return;

  const outstr = shell.exec(`git branch`);
  clear();
  const curBranch = outstr.stdout.split(/\n/)[0].replace(/\*/, "").trim();
  if (curBranch !== "beta") {
    console.error("上线失败，请先切换到beta分支～");
    return;
  }

  shell.exec(`git checkout beta`);
  shell.exec(`git pull`);
  shell.exec(`git checkout master`);
  shell.exec(`git pull`);
  shell.exec(`git merge beta`);
  shell.exec(`git push`);

  shell.exec(`git branch -D beta`);
  shell.exec(`git push origin --delete beta`);

  const { time } = require("../utils/time");
  const tagName = `v${time}`;
  shell.exec(`git tag ${tagName}`);
  shell.exec(`git push origin ${tagName}`);
};

const gitPol = async () => {
  if (gitBranch().includes("beta")) {
    shell.exec(`git checkout beta`);
    shell.exec(`git pull`);
  } else {
    shell.exec(`git checkout master`);
    shell.exec(`git pull`);
    shell.exec(`git checkout -b beta`);
  }
  await gitMerge();
};

const gitDel = async () => {
  const list = gitBranch();
  const selectBr = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "请选择你想要删除的分支？",
      choices: list,
      default: 0,
    },
  ]);
  if (selectBr.name === "master") {
    console.log("删除失败，master代码不允许删除！");
    return;
  }

  shell.exec(`git branch -D  ${selectBr.name}`);
  shell.exec(`git push origin --delete  ${selectBr.name}`);
};

module.exports = {
  gitCr,
  gitPush,
  gitDev,
  gitOl,
  gitPol,
  gitMerge,
  gitDel,
};
