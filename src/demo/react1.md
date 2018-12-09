#####react
- view层框架，用来实现UI界面的
- 通过virtual Dom来减少对原生Dom的操作，操作dom的代价是昂贵的
- VDOM是用 JavaScript 对象结构表示 DOM 树的结构
- 核心api有两个，h(tag, attr, childern)，patch(vNode, newNode)
- 更新流程。
	-  根据jsx生成VNode  => patch(contoiner, VNode)
	-  => 数据变更后，生成新的newNode
	-  =>  react-diff算法，将差异更新到dom节点上
- diff算法
	- linux上的diff命令。react用js实现
	- 相对于传统的递归，对每个节点进行对比。react有策略降低算法复杂度
	- tree diff：对树进行分层比较，两棵树只会对同一层次的节点进行比较
	- component diff 不同类型组件，替换。同类型的组件，通过shouldComponentUpdate用户手动干预，节省大量diff时间。
	- element diff：当节点处于同一层级时，React diff会根据节点的key值， 提供了三种节点操作，分别为：插入、移动、删除。
- 性能优化
	- 重写shouldComponentUpdate来避免不必要的dom操作。return false
    - 使用 production 版本的react.js. 编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息。通常情况下我们会使用 Webpack 的 DefinePlugin 方法来将 NODE_ENV 变量值设置为 production。
    - 使用key来帮助React识别列表中所有子组件的最小变化。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染.


- react 生命周期
	- 执行过程中不同时期的10个钩子函数，render重复两次
	- 初始化，只执行一次
		- getDefaultProps、getInintalState、componentWillMount, render, componentDidMount
	- 运行中
		- componentWillReceivePorps, shouldComponentUpdate, componentWillUpdate,  render, componentDidUpdate,
	- 销毁
	  - componentWillUnmount

    // 用于初始化 state
  constructor() {}
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // 组件更新后调用
  componentDidUpdate() {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}

- ![生命周期](https://user-gold-cdn.xitu.io/2018/6/23/1642cca46deb8072?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


