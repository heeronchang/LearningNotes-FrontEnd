# Webpack

## 相关博客

1. [Webpack基础](https://zhuanlan.zhihu.com/p/57722935)
2. [Webpack 是怎样运行的（一）](https://zhuanlan.zhihu.com/p/52826586)
3. [Webpack 是怎样运行的（二）](https://zhuanlan.zhihu.com/p/53044886)
4. [Webpack中 publicPath](https://juejin.im/post/5ae9ae5e518825672f19b094)
5. [搭建 webpack-dev-server](http://www.cnblogs.com/penghuwan/p/6941616.html#_labelTop)
6. [webpack 之 devtool 和 webpack-dev-server](https://www.cnblogs.com/jingmoxukong/p/7018671.html)
7. [深入浅出的webpack构建工具---devTool中SourceMap模式详解](https://www.cnblogs.com/tugenhua0707/p/9464984.html#_labe1_2)
8. [Webpack Code Splitting](https://blog.csdn.net/zjw0742/article/details/74518955)
9.  [[webpack] 你真的知道 css-loader 怎么用吗？](https://juejin.im/entry/5826e755c4c9710054313d6e)
10. [url-loader 和 file-loader](https://segmentfault.com/a/1190000011487980)
11. [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
12. [Webpack入门之遇到的那些坑，系列示例Demo](https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html)

## Webpack 基础配置

Webpack 作为一个模块打包器，可以通过各种 loader 和插件的加成，打包一切！！！

### 开始

`npm init`
`npm i -D webpack webpack-cli`

### 配置

除了 js 文件可以直接打包外，其它的资源，如 CSS，HTML，图片等都需要使用 相应的 loader。

#### ES6 转换（babel-loader）

`npm i -D babel-loader @babel/core @babel/preset-env`

#### 打包 HTML（html-webpack-plugin, html-loader)

打包 html 文件，并且 html 文件对 js 的引用自动变更。

html-webpack-plugin 的功能是压缩、输出 html 文件，并且在里面加入打包后的 js 和 css 引用。
html-loader 的功能是解析 html 中饮用的资源文件，如 <img> 的 src。


#### 打包 CSS （css-loader, style-loader, mini-css-extract-plugin）

CSS 文件需要在作为入口文件的 js 文件中通过 `import` 指令引入。

style-loader 用来把 css 嵌入到对应的 html 标签。

在配置 rules 时，style-loader 一定要放在 css-loader 的上面，此处 loader 的执行顺序是从下往上。

mini-css-extract-plugin 用来单独输出 CSS 文件

#### 优化 JS 和 CSS 文件（uglifyjs-webpack-plugin, optimize-css-assets-webpack-plugin）

压缩和优化。

在 webpack.config.js 文件配置里，这两个插件是配置在和 plugins 同级的 optimization 中。

如果 uglifyjs-webpack-plugin 配置开启了 sourceMap, 还需要在和 optimization 同级的地方添加 devtool: 'source-map'。

注意：optimize-css-assets-webpack-plugin 不是无损压缩，会出现属性合并、选择器合并等情况。

#### 打包图片和其它资源文件(file-loader, url-loader)

url-loader 几乎支持所有资源的预处理，可以将比较小的资源文件转为 base64 编码嵌入 html、css 或 js 文件里。

使用 file-loader 处理例外（如 Safari 不支持提取 base64 的图标？）。可以在 url-loader 配置的上方配置 file-loader， 并且需要在 url-loader 中添加 exclude 配置。

#### 输出文件清理（clean-webpack-plugin)

由于输出的 js、css 文件名里都有哈希值，每次构建都无法覆盖先前的输出文件，clean-webpack-plugin 可以自动删除先前的输出文件。

#### Webpack Code Splitting

使用 `CommonsChunkPlugin` 和 `webpack-bundle-analyzer` 
[Webpack Code Splitting]('./webpack之CodeSplitting.md')

### package.json 配置

#### 普通配置方式
webpack 命令默认的配置文件是根目录下的 webpack.config.js。

```JSON
"scripts": {
  "build": "node_modules/.bin/webpack"
}
```

`node_modules/.bin/webpack` 是一个指令，通过以上配置 `npm run build` 相当于执行了前者。

#### 区分环境的配置方式

```JSON
"scripts": {
  "dev": "node_modules/.bin/webpack-dev-server --open --config config/webpack.dev.js",
  "start": "npm run dev",
  "build": "node_modules/.bin/webpack --config config/webpack.prod.js"
}
```

`--config` 用来指定配置文件，`--open` 自动打开浏览器。

### 配置拆分

通过 开发服务器（dev server）、实时热重载（live reloading）和模块热重载（Hot Module Replacement, HMR）可以方便我们开发时进行调试，这个时候需要区分开发环境和生产环境。

#### 配置拆分

拆分 webpack.config.js 配置文件，新建一个 config 文件夹：

```
 config
  |- webpack.common.js
  |- webpack.dev.js
  |- webpack.prod.js
```
使用 webpak-merge 工具分别合并开发环境和公共的配置，合并生产环境和公共的配置。

```JavaScript
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  ...
});
```
注意路径问题。

mode 属性取值：production、development、none。默认 production。

#### 环境问题

webpack 具有一个全局变量 process.env.NODE_ENV。等同于在 plugins 中添加了如下语句：

```JavaScript
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringfy("development|production")
})
```
#### 开发服务器配置

在配置文件中添加 devServer。

webpack 打包和 webpack-dev-server 开启服务的区别：webpack 输出真实的文件，而 webpack-dev-server 输出的文件只存在于内存中，这些打包后的资源对外的根目录就是我们配置的 publicPath（这里的 publicPath 路径下的打包文件可以在浏览器中访问，而静态资源仍然是使用 output.publicPath）

**devServer.contentBase & devServer.publicPath**

devServer.contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
devServer.publicPath 用于确定应该从哪里提供 bundle，并且此选项优先。

#### 模块热替换配置

模块热替换（Hot Module Replacement, HMR）是webpack提供的最有用的功能之一。
它允许在运行时更新各种模块，而无需进行刷新。和之前webpack-dev-server自带的live reload功能不同，
模块热替换由于避免了整页更新，从而在调试时可以保持网页的使用状态（如填写字段、弹出弹窗等等）。

```JavaScript
plugins: [
    new webpack.HotModuleReplacementPlugin(),  // 开启全局的模块热替换
    new webpack.NamedModulesPlugin()  // 当模块热替换时在浏览器控制台输出对用户更友好的模块名信息
]
```

在 devServer 属性里添加 hot: true

### 模块懒加载

#### webpack-bundle-analyzer

Visualize size of webpack output files with an interactive zoomable treemap.
