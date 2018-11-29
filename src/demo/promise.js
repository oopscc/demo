/**
 * 1. 三个状态，pending, resolve, reject
 * 2. 参数fn是一个方法，接受两个参数，resolve成功时执行的函数，reject失败时执行的函数
 * 3. then接受两个回调，第一个成功回调(resolve.value)，第二个失败回调(reject.reason)
 * 4. then返回新的primose
 */
// 引用状态机
// 观察者模式，执行then
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
            fn(resolve, reject)
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
