- url输入
    - 用户输入url => 浏览器获取url
    - 应用层(浏览器)进行DNS解析
    - 根据解析的ip和端口，应用层发起http请求，携带header 缓存，cookie之类 和body 请求内容
    - 到达传输层，tcp协议，三次握手，保证传输安全。大数据块分割成报文段
    - 到达网络层，通过arr寻址，ip协议传输数据包
    - 数据到达数据链路层，请求完成
    - 接收方在数据链路层接收到数据包后，层层到达应用层
    - 应用层接受到的http请求
    - 找到资源，相应报文
    - 发送方接收到响应，进行页面渲染
- 页面渲染
    - HTML解析器根据 => DOM tree
    - css解析器 => cssom tree
    - js dom api=> dom tree, css  api => csscom tree
    - 浏览器讲dom tree + css tree => render tree
    - 重排/回流，
    - 绘制，调用 GPU 绘制，合成图层，显示在屏幕上。
- 性能优化
    - http层
        - 缓存： 强缓存、协商缓存
        - 使用http2.0
        - 静态资源上cdn, 并且使用多个cnd域名
        - 压缩静态文件大小
    - css
        - 放在head里。避免重绘，回流
        - 合并css代码
        - 图片使用base64. 雪碧图。或者尽量少用图片，使用confront，或者css动画。
    - js
        - 放在body后。dom渲染之后在执行js。避免js阻塞
        - 合并js代码。
        - 尽量减少js操作dom
        - window.requestAnimationFrame
        - 执行 JS 代码过长会卡住渲染，对于需要很多时间计算的代码可以考虑使用 Webworker。Webworker 可以让我们另开一个线程执行脚本而不影响渲染。
        - 懒加载
    - html
        - 避免在htlm中写css
        - 语义化标签，减少css代码，增加可读性和seo
    - webpack的性能优化
        -
- http2
    - 二进制分帧。 HTTP1.x的解析是基于文本。 HTTP/2规范中一共定义了10种帧，其中最基础的两种分别对应于HTTP/1.1的DATA和HEADERS帧
    - 多路复用。 单个连接上建立多个流，实现流的多路复用。流可以指派一个优先级。避免线头阻塞
    - 头部压缩。 使用HPACK对HTTP/2头部压缩，头部缓存
    - 服务器推送。 可以主动向客户端推送资源让客户端缓存
- webpack loader优化
    - 1


- 安全
    - xss攻击
        - 注入脚本
        - 最普遍的做法是转义输入输出的内容，对于引号，尖括号，斜杠进行转义
    - csrf攻击
        - 抓包发送请求
        - Get 请求不对数据进行修改
        - 不让第三方网站访问到用户 Cookie
        -   阻止第三方网站请求接口
        -   请求时附带验证信息，比如验证码或者 token

    - 密码安全
        - md5加密

- 动态规划
    - 分阶段求解
    - 分解为简单的子问题
    - 递归、迭代
- event loop

- hybrid app
  -
- 正则表达式
    - name = name.replace(/[\[\]]/g, '\\$&');
    - var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    - 断言，找位置 （?=pattern）（?=pattern）
    - 捕获（） 非捕获(?:)
    - 反向引用 \k
    - 非贪婪 量词后边?
- 函数柯里化源码
    -
- 高阶函数 filter,reduce,map
    -
- 高阶组件 connect
    -
- vue、react异同
    － 数据流向不同。 但是都用单项数据流redex管理起来了
    - 监听数据变化的方式不同
    － 模版渲染方式不同
    － vuex和redux不同
        －vuex的Sstore直接注入到vue组件中。可以直接commit upadte。 而redux需要connect将action和diapacth链接映射到组件。只能通过reduce的方式改变数据。
        － 比较引用的方式，如果不优化，将导致大量vnode重绘

