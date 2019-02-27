
/**
 * 高阶函数
 * - 参数复用，避免大量的代码重复
 * - 动态创建函数
 * - 延迟计算
 * -
- 高阶组件
- 封装并分离组件的通用逻辑，复用通用逻辑
- 装饰者模式
 */

 /**
  * 性能优化
  - 70%的时间浪费在网络请求上。 domcontentload， onload
  - 减少网络请求时间
    - 减少网络请求次数
    - 多并发，多源
    - 减少文件体积, js,css文件合并，图片雪碧图
    - 使用cdn加速
    - h5资源离线包
    - 缓存策略
        - 强缓存
        - 协商缓存
  - 减少页面渲染时间
    - ssr
    - 懒加载
    - requestAnimationFrame
    - 减少重绘和回流
  */
async function async1() {
    console.log( 'async1 start' )
    await async2()
    console.log( 'async1 end' )
}

async function async2() {
    console.log( 'async2' )
}

console.log( 'script start' )

setTimeout( function () {
    console.log( 'setTimeout' )
}, 0 )

async1();

export default class MyPromise {
    constructor(fn) {
        this.status = 'pending'
        this.onResolves = []
        this.onRejects = []
        function resolve(value) {
            if(this.status === 'pending') {
                this.value = value;
                this.status = "fulfilled"
                this.onResolves.map(fn => fn(value))
            }
        }
        function reject(reason) {
            if(this.status === 'pending') {
                this.value = reason;
                this.status = "rejected"
                this.onRejects.map(fn => fn(reason))
            }
        }
        try {
            fn(resolve.bind(this), reject.bind(this))
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :  data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => err
        if(this.status === "fulfilled") {
            return new MyPromise((resolve, reject) => {
                onFulfilled(this.value)
            })
        }
        if (this.status === "rejected") {
            return new MyPromise((resolve, reject) => {
                onRejected(this.value)
            })
        }
        if (this.status === "pending") {
            return new MyPromise((resolve, reject) => {
                this.onResolves.push(onFulfilled)
                this.onRejects.push(onRejected)
            })
        }
    }
    catch() {

    }
}

new MyPromise( function ( resolve ) {
    console.log( 'promise1' )
    resolve();
    console.log(2)
} ).then( function () {
    console.log( 'promise2' )
} )
