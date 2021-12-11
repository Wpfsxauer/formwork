// 动画效果
const ora = require("ora");
// 字体加颜色
const chalk = require("chalk");
// 显示提示图标
const symbols = require("log-symbols");
//工具函数
const { promisify } = require("util");
// 下载模板
const download = promisify(require("download-git-repo"));

async function templateHandle(url, filename) {
    const spinner = ora("正在下载项目...");
    spinner.start();
    const err = await download(url, filename);
    if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(`${filename}项目创建失败。`));
    } else {
        spinner.succeed();
        console.log(symbols.success, chalk.green(`${filename}项目创建成功。`));
    }
}

module.exports = {
    templateList: [
        { name: "vue", url: "Wpfsxauer/vue-vite-moible-template" },
        { name: "react", url: "Wpfsxauer/react-template" },
    ],
    templateHandle,
};
