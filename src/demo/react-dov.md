dva+ant Design 开发随访系统
- Dva是redux做了一层封装
- 项目特点
	- 通过 reducers, effects 和 subscriptions 组织 model
	- 是用mockjs模拟用户数据
	- 通过proxy拦截ajax请求
- 项目难点。
	- 登录状态的保持
		-  登录成功之后服务器会设置一个当前域可以使用的Cookie，例如token啥的。然后在每次数据请求的时候在Request Headers中携带token，后端会基于这个token进行权限验证
		-  headers里的'Authorizaton': 'Bearer ' + sso_token,
		-  fetch返回之后，优先用中间件处理401错误，然后载进行具体业务逻辑
		-
	- router
		- 对于路由的验证配置在onEnter属性中，authenticated方法可统一进行路由验证，要注意每一个Route节点的验证都需要配置相应的onEnter属性。
	- 数据缓存
		- 比如缓存用户信息。在subscriptions中配置了setup检测LocalStorage中的user是否存在。不存在时会去query用户信息，然后保存到user中，如果存在就将user中的数据添加到state的user: {}中
		- 通过localstorage实现。在subscriptions中监听路由变化，当list时，缓存permissions数据。当添加和修改时就不用再次请求了。
	- 跨域。允许携带cookie