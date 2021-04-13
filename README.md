# 项目介绍

- node 脚本，配置 vue、react 模版，封装 git 命令

## 脚本信息

```javascript
  fw -h
```

## 模版工程

```javascript
  fw init "your project name"
```

## git 脚本

```javascript
  fw -g "your commit content"
```

- 输入commit内容后选择commit类型，选择完毕后脚本会自动增加类型前缀,具体如下

    | type   | docs   |
    | :---- | :---- |
    | feat | 新功能 |
    | fix | 修复bug |
    | docs | 文档改变 |
    | style | 代码格式改变 |
    | refactor | 某个已有功能重构 |
    | perf | 性能优化 |
    | test | 增加测试 |
    | build | 改变了build工具，如grunt换成了npm |
    | revert | 撤销上一次的commit |
    | chore | 构建过程或辅助工具的变动 |
    |  |  |
