#####react-redux
- react组件传递是单向的，如果组件关系太远，或者没有关系，我们就会很麻烦，redux就是解决这个问题，他将数据存储到仓库，通过reducer，将用户派发action动作更新仓库，同时subscrible变化。react实现flux
- redux提供connect方法和provider组件
- connect方法
	-  UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。两者通过React-Redux 提供connect方法联系起来
	- ```const VisibleTodoList = connect(
	  mapStateToProps,
	  mapDispatchToProps
  )(TodoList)```
	 - mapStateToProps
		 - 负责输入逻辑,将state映射到 UI 组件的参数（props）
	 - mapDispatchToProps
		 - 后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action
- Provider组件
	- Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。Provider的唯一功能就是传入store对象。
	- 通过React组件的context属性实现。一个接受store的组件，通过react的context上下文api传递给所有子组件
![Alt text](./image.png)
