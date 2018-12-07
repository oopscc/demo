#### webpack性能优化
- 体积优化 --使用webpack-bundle-analyzer分析包体积
    - 按需加载
        - 如ant design,element-ui等第三方库，用babel-plugin-import
    - 分离多余依赖
        - es6+的import(),  require.ensure()实现动态加载。比如单页面的路由等。
        - code spliting. commonsChunkPlugin
    - 作用域提升 ModuleConcatenationPlugin。 它会使代码体积更小，因为函数申明语句会产生大量代码

- 构建速度
    - 首次构建速度
        - happypack多线程打包。把loader分解给多个子进程并发执行，执行完结果再发送给主进程。
        - DLL Plugin.前置依赖包使得不常更新的包不参与打包来提升构建速度.
        - externals. 把我们的依赖申明为一个外部依赖，外部依赖通过 < script> 外链脚本引入,有更好的 cdn 缓存加持.
        - 减少文件搜索范围 使用exclude和include限定文件搜索路径。文件alias
        - 开启devtool: "#inline-source-map"会增加编译时间
        - npm镜像
    - 重载速度
        - 开启缓存babel-loader?cacheDirectory。 happypack的cache
        - 开启webpack热替换hmr. HotModuleReplacementPlugin. 原理，建立一个web socket进行通信。
        - webpack-dev-server增量构建
- 打包
    - webpack-parallel-uglify-plugin

- webpack4内部优化
    - 开箱即用。只需要配置mode。两种模式分别内置了很多配置
        - prod。
            - 不用额外的增加uglify，和作用域提升
            - 内置optimization.minimize来压缩代码，不用再显示引入UglifyJsPlugin
            - 废弃CommonsChunkPlugin插件，使用optimization.splitChunks和optimization.runtimeChunk来代替
        - dev
            - 开启缓存机制
            - 开启dev-tool方便调试
            - 开启output.pathinfo，在产出的bundle中显示模块路径信息
            - 开启NamedModulesPlugin
    - optimization配置
        - runtimeChunk。webpack4之前，使用commonsChunkPlugin.  webpack4直接配置
        - splitChunks。分离包规则。pllyfill > dll > common > manifest. 共4个chunk包。
        - moduleIds。 根据模块路径映射的hashed 固化缓存。
        - namedChunks: true. 根据chunkName代替chunkid，保持缓存。
    - https://www.cnblogs.com/wmhuang/p/8967639.html