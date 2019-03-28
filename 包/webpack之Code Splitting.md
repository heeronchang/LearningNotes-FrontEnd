# Webpack Code Splitting 和 JS 文件懒加载

## [Webpack Code Splitting](https://blog.csdn.net/zjw0742/article/details/74518955)

## Code Splitting 是什么

以前为了减少页面 http 请求，会把所有文件打包成一个文件，如果文件过大或者文件中的一些内容是按需使用的（例如，环境不同使用的文件不同或这web 和移动端等设备差异），这样还打包成一个文件并一次性全部加载就得不偿失了。

此时，我们可以把按需使用的文件打包成不同的模块，需要时再去加载，或者使用浏览器缓存。

Code Splitting 就是用来把代码打包成多个块 (chunk)。

## Code Splitting 的使用场景

1. 分离业务代码和第三方库

业务需求更新迭代快，第三方库更新迭代慢，把两者分割开来可是锁定第三库的版本，充分利用浏览器缓存来加载这些模块。

`CommonsChunkPlugin` `minChunks`

```JavaScript
module.exports = {
  ...
};
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(), // 分析包大小的工具

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource
        && resource.indexOf('node_modules') >= 0
        && resource.match(/\.js$/)
      ),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: 'common-in-lazy',
      minChunks: ({ resource } = {}) => (
        resource
        && resource.includes('node_modules')
        && /axios/.test(resource)
      ),
    }),

    // 所有的 chunk 中找到依赖2次及以上的模块
    new webpack.optimize.CommonsChunkPlugin({ 
      async: 'used-twice', 
      minChunks: (module, count) => (
        count >= 2
      ),
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
```

2. 按需加载(利用 import()语法)

用户访问某个路由的时候再去加载某些模块；用户权限只能访问其中一些页面，其它不能访问的页面就无需加载；设备环境引起的需求不同，如移动端和PC端的差异。

```JavaScript
const Emoji = () => import(
  /* webpackChunkName: "Emoji" */
  './page/Emoji.vue'
)

// webpack 配置
output: {
  chunkFileName: '[name].chunk.js',
}
```
