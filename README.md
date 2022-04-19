# 项目介绍

```javascript
  npm i wpfnodecli -g
```

- node 脚本，配置 vue、react 模版，封装 git 命令

## 脚本信息

```javascript
fw - h;
```

## 模版工程

```javascript
  fw init "your project name"
```

## git 脚本

- 1、merge 操作

```javascript
  fw - m
```

- 2、push 操作

```javascript
  fw -p "your commit content"
```

- 输入 commit 内容后选择 commit 类型，选择完毕后脚本会自动增加类型前缀,具体如下

  | type     | docs             |
  | :------- | :--------------- |
  | feat     | 新功能           |
  | fix      | 修复 bug         |
  | docs     | 文档改变         |
  | style    | 代码格式改变     |
  | refactor | 某个已有功能重构 |
  | perf     | 性能优化         |

- 3、部署 dev 环境

```javascript
  fw -d
```

- 3、部署预生产环境

```javascript
  fw -pr
```

- 4、部署生产环境

```javascript
  fw -o
```
