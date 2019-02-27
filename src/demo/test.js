import { get } from "http";
import { is } from "css-select";

class Observer {
    constructor(obj) {
        Object.keys(obj).forEach(key => {
            if(typeof obj[key] == 'object') {
                this.walk(obj[key])
            }
            defineReactive(obj, key, obj[key])
        })
    }
}

let defineReactive = (obj, key, value)=> {
    Object.defineProperty(obj, key, {
        set(newVal) {
            value = newVal;
            dep.nodify()
        },
        get() {
            Dep.target.addDepend()
            return value
        }
    })
}

class Dep {
    constructor() {
        this.subs = []
    }
    addDepend() {
        Dep.target.addDep(this)
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    nodify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
class Watcher {
    constructor() {
        // this.dep =
        this.value = this.getVal()
    }
    getVal() {
        Dep.target = this
        this.value = this.vm[key]
        Dep.target = null
        return value
    }
    addDep(dep) {
        dep.addSub(this)
    }
    update() {

    }
}

var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

for(let key in obj) {
    let newObj = obj instanceof [] || {}
    if(obj.hasOwnProperty(key)) {
        // 递归
        newObj[key] = deepCoyp(obj[key]) || newObj[key]
    }
    return newObj
}

Function.prototype.myCall(context) {
    // arguments
    var context = context || window;
    context.fn = this;
    // let args = Array.prototype.slice.call(arguments, 1)
    let args = [...arguments].slice(1)
    // let fn = this;
    let res =  context.fn(...args)
    delete context.fn
    return res
}
Function.prototype.myapply(context) {
    context = context || window
    context.fn = this;
    let args = [...arguments][1]
    if(args) {
        return context.fn(args)
    }
    delete context.fn
}
Function.prototype.mybind(context) {
    context = context || window
    // context.fn = this;
    let args = [...arguments].slice(1)
    let _this = this;
    return function F() {
        if (this instanceof F) {
            // 兼容new F()的情况
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(arguments))
        }
    }
}

function _new() {
    let newObj = new Object();
    let Con = [].shift.call(arguments)
    // prototype
    newObj.__proto__ = Con.prototype
    // this
    let res = Con.apply(newObj, ...args)
    return  typeof res == 'object' ? res || newObject
}

function curring(fn) {
    let args = []
    return function() {
        args.push([].slice.call(arguments))
        if(args.length == fn.length) {
            const _args = args;
            args = [];
            return fn.apply(this, args)
        }
        return arguments.callee
    }
}

function dobounce(fn, wait, immedia) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;

        if(imedia && !timer) {
            fn.apply(context, args)
        }
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=> {
            fn.apply(this, args)
        }, wait)
    }
}

function throttle(fn, wait, immedia) {
    let timer;
    let callNow = immedia
    return function() {
        let context = this;
        let args = arguments;
        if(callNow) {
            fn.apply(context, args)
            callNow = false
        }
        if(!timer) {
            timer = setTimeout() {
                fn.apply(context, args)
                clearTimeout(timer)
            }
        }
    }
}


class Promise {
    contructor(fn) {
        let _this = this;
        this.status = "pending"
        this.fulfilledCallback = [];
        this.rejectCallback = [];
        _this.resolve = function(value) {
            if(value instanceof Promise) {
                return value.then(resolve, reject)
            }
            setTimeout(() => {
                if(_this.status="pending") {
                    _this.status = "fulfilled"
                    _this.value = value;
                    _this.fulfilledCallback.forEach(cb => cb(value))
                }
            })
        }
        _this.reject = function(reason) {
            setTimeout(()=> {
                if(_this.status == "pending") {
                    _this.status = "rejected"
                    _this.reason = reason;
                    _this.fulfilledCallback.forEach(cb => cb(reason))
                }
            })
        }
        try {
            fn(_this.resolve, _this.reject)
        }catch(e) {
            _this.reject(e)
        }
    }
    then(onResolved, onRejected) {
        let self = this;
        let promise2;
        onResolved = 'funciton' ? onResolved : value => value;
        onResolved = 'funciton' ? onResolved : value => value
        if(self.status = "resolved") {
            promise2 = new Promise((resolve,reject) => {
                setTimeout(() => {
                    try{
                        let x = onResolved(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(reason){
                        reject(reason)
                    }
                })
            })
            return promise2
        }
        if(self.status == 'pending') {
            promise2 = new Promise((resolve,reject)=> {
                    self.resolveCallbacks.push(() => {
                        try{
                            let x = onResolved(self.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(reason){
                            reject(reason)
                        }
                    })
                })
            })
        }
    }
    resolvePromise(promise2, x, resolve, reject) {
        if(promise2 === x) {return reject('error')}
        if(x instanceof Promise) {
            if(x.status === 'pending') {
                x.then(y=> resolvePromise(promise2, y, resolve, reject))
            } else {
                x.then(resolve, reject)
            }
        }
        if(x && x.then ) {
            try {
                if(typeof then === 'function')
                then.call(x, y=>resolvePromise(promise2, y, resolve, reject), e=> reject(e))
                else resolve(x)
            }catch(e) {
                reject(e)
            }
        }
        resolve(x);
    }
}
/**
 - react、vue数据变更时发生了什么，哪个效率更高 1
 - css，position 1
 - generator应用场景
 - promise.all 实现原理 1
 - rem原理，flex布局

 - trim，正则
 - bind第二个参数
 - mvvm为什么叫mv vm，vm做了什么 1
 - 冒泡时间复杂度计算            1
 - 数据缓存 hashmap?  刷题
 - vue router           1

 react 箭头函数方法
 - promisify原理         1
 - 父子状态机
 - 数组找重复，hashmap
 - nodejs，文件diff，热更新实现过程，如何替换变更
 - webpack loader，实现一个loader
 - mockjs，如何在不侵入代码的情况下，代理数据，mockjs实现原理
 */

 const prosimify = (fn, ctx) => {
     return function() {
        let ctx = ctx || this;
        let args = arguments;
        return Promise((resolve,reject)=> {
            fn.call(ctx, ...args, function() {
                let error = [].shift.call(arguments)
                if(error) {
                    reject(error)
                } else {
                    resolve(arguments)
                }
            })
        })
     }
 }
 /**
  * gaode -
  * mayi
  * yuantiku -
  * oppo -
  * aribnb -
  */
