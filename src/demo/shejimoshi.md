- 工厂模式
- 单例模式
    - 单例模式的关键在于不能让外部使用者 new 出对象，即构造函数是 private ，这一点 JS 是无法实现的，非常遗憾
    ```js
        class SingleObject {
            login() {
                console.log('login...')
            }
        }
        SingleObject.getInstance = (function () {
            let instance
            return function () {
                if (!instance) {
                    instance = new SingleObject();
                }
                return instance
            }
        })()
    ```
- 观察者模式
    - 主题有一个收集每个观察者的数组。状态变化是，遍历数组，通知观察者执行update方法变更
    - 1对多，primise.then  事件绑定 vue响应式
    ```js
        class Subject {
            constructor() {
                this.state = 0
                this.observers = []
            }
            getState() {
                return this.state
            }
            setState(state) {
                this.state = state
                this.notifyAllObservers()
            }
            attach(observer) {
                this.observers.push(observer)
            }
            notifyAllObservers() {
                this.observers.forEach(observer => {
                    observer.update()
                })
            }
        }
        // 观察者，等待被触发
        class Observer {
            constructor(name, subject) {
                this.name = name
                this.subject = subject
                this.subject.attach(this)
            }
            update() {
                console.log(`${this.name} update, state: ${this.subject.getState()}`)
            }
        }
    ```
- 状态模式。 有限状态机。 状态变化，执行响应状态的动作
- 装饰模式。
    -  装饰类，装饰方法。 react的connect装饰到组件上
    -  function(target, name, descriptor)
- 代理模式
    - es6代理
    - Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。就是一个属性的代理器。
    ```js
        // 经纪人
        let agent = new Proxy(star, {
            get: function (target, key) {
                if (key === 'phone') {
                    // 返回经纪人自己的手机号
                    return '18611112222'
                }
                if (key === 'price') {
                    // 明星不报价，经纪人报价
                    return 120000
                }
                return target[key]
            },
            set: function (target, key, val) {
                if (key === 'customPrice') {
                    if (val < 100000) {
                        // 最低 10w
                        throw new Error('价格太低')
                    } else {
                        target[key] = val
                        return true
                    }
                }
            }
        })
    ```
- 迭代器模式
    - es6有序集合 能表示有序集合的数据类型已经有很多了，
    - data[Symbol.iterator]() 返回一个Iterator.next().done
    - es6的Generator，返回的是一个Iteratoterator
    ```js
    Array
    Map
    Set
    String
    TypedArray
    函数中的 arguments
    NodeList
    ```




