# Npm

## npm 概述
npm 是 node package manager 的简写。

每个项目都应该有一个 `package.json` 文件。可以在终端使用 `npm init` 指令生成。


## npm 常用指令

- `npm i --global` npm 升级 npm
- `nmp --version` npm 版本
- `npm init -y` 跳过向导，快速生成
- `npm install` 把 `dependencies` 中的包一次性安装
- `npm i xxx` 安装包 xxx
- `npm i xxx --save` 安装包并保存依赖项（`package
.json` 中的 `dependencies）`
- `npm uninstall xxx` 删除包 xxx ，如果有依赖项，依赖项依然存在。
- `npm uninstall --save` 删除包且删除依赖项


使用 cnpm 的两种方式：
- 全局安装 cnpm （`npm i cnpm --global`），然后使用 `cnpm i xx`。
- 全局配置包安装源 `npm config set registry https://registry.npm.taobao.org`，使用 `npm config list` 查看
