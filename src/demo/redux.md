####redux

- Redux是一种架构模式，是由flux发展而来的。最大特点就是数据的单向流动
- 三大要素
	- 唯一数据源
	- 状态只读。对象不可改
	- 数据改变只能通过纯函数（reducer）完成

-![Alt text](./image.png)
![Alt text](./image.png)

- redux源码核心api有5个：
	- createStore 创建仓库，接受reducer作为参数
	- bindActionCreator 绑定store.dispatch和action 的关系
	- combineReducers 合并多个reducers
	- applyMiddleware  洋葱模型的中间件,介于dispatch和action之间，重写dispatch
	- compose  整合多个中间件
	-
- 中间件自定义拦截 action -> reducer 的过程。变为 action -> middlewares -> reducer 。这种机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。常用redux中间件
	- redux-logger 日志输出
	- redux-thunk  处理异步操作
	- redux-promise  处理异步操作


#### 5点不同：
- 监听数据变化原理不同
- 模版渲染不同
- mixin和hoc
- 数据流方向不同
- redux，vuex不同
