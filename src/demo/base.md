- 数据基本类型
    - 7种 null、undefined、string、number、Boolean、symbel。 引用类型
    - JS 的数字类型是浮点类型的，没有整型。并且浮点类型基于 IEEE 754标准实现
    - symbel表示独一无二。通过函数symbel()创建
    - 引用类型object

- 继承
    - es5 继承
        - 子prototype是指向父prototype的实例。 child.prototype.__proto__ = Parent.prototype
        - child.prototype.__proto__.constructor = Parent
    - es6 继承
        - class完成。 是一种语法糖。
- 闭包
    - 函数A里边返回一个函数B，B中使用了函数A定义的变量。则B称之为闭包。A的变量存在于B的作用域链上，在函数A执行完之后不会被释放。
    - setTimeout中的var 问题。使用let,  使用闭包解决。
- this
    - 只依赖于调用函数前的对象
    - new, call, apply.改变this
    - 箭头函数依赖定义时的执行上下文
- call、apply，bind区别
    - call，apply函数会改变this指向。作用相同，只是传参数不同。call接受参数列表，apply只接受一个数组
    - 手写代码
        - call(context, args)
        - context.fn = this
        - context.fn(...args)
    - bind和其他两个作用相同，只是返回一个函数。
        - return this.apply(context, ...args)
- es6
    - promise。解决回调地域的问题。已经变成一种规范
    - generator 设计模式，next()
    - es7.async,await。 同步写法，自动执行next。返回promise
    - 使用async，await解决then回调的问题。
    - 滥用await会导致阻塞。 promise.all()解决并发

    - proxy 代理模式
        - 代理对象。 重写对象的方法 TODO
    - @ 装饰者模式
        - 装饰对象和对象的方法。提取一些公共的代码。如log等中间件
        - function由于存在状态提升的问题，不能使用装饰着模式，要使用高阶函数代替
- 判断对象全等
    - say something
- 缓存
    - 强缓存
        - Expires  1.0
        - Cache-Control 1.1  max-age
    - 协商缓存
        - Last-Modified 和 If-Modified-Since
        - ETag 和 If-None-Match
    - 缓存策略
        - 不需要缓存的 Cache-control: no-store
        - 频繁变动的 Cache-Control: no-cache + ETag(业务逻辑代码)
        - 代码文件  Cache-Control: max-age=31536000 + 版本好hash
- http状态码
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',

