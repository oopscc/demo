function Parent(name) {
    this.name = name;
    this.color = ['red', 'gray']
}
Parent.prototype.say = function () {
    console.log('parent: ' + this.name)
}

function Child(name) {
    Parent.call(this, name)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

// function Object(obj) {
//     let F = function() {}
//     F.prototype = obj
//     return new F()
// }
// let prototype = Object(Parent.prototype)
// prototype.constructor = Child
// Child.prototype = prototype

var a = new Child('vv')
window.a = a
console.log(a)

/*
Parent(){}                      Parent.prototype
prototype                       constructor

Child(){}                       Child.prototype
prototype                       constructor
                                __prototype__
new Child()
__prototype__
*/

// async function aa () {
//     console.log(1)
//     await new Promise( (a, b) => {

//         setTimeout(() => {console.log(2)} )
//         a()
//     })
//     console.log(3)
// }
// window.b = aa()


// 现在有一个 Ajax 接口，
// 根据用户 uid 获取用户 profile 信息，
// 是一个批量接口。
// 我把这个 ajax 请求封装成以下的异步函数
// uidList 是一个数组，最大接受 100 个 uid
var requestUserProfile = function (uidList) {
    // 这个方法的实现不能修改
    // console.log("uidList: ", uidList)
    /** 先去重 */
    var uidList = uidList || [];
    var _tmp = {};
    var _uidList = [];
    uidList.forEach(function (uid) {
        if (!_tmp[uid]) {
            _tmp[uid] = 1;
            _uidList.push(uid);
        }
    })
    _tmp = null;
    uidList = null;

    return Promise.resolve().then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () { // 模拟 ajax 异步，1s 返回
                console.log('发送请求')
                resolve();
            }, 1000);
        }).then(function () {
            var profileList = _uidList.map(function (uid) {
                if (uid < 0) { // 模拟 uid 传错，服务端异常，获取不到部分 uid 对应的 profile 等异常场景
                    return null;
                } else {
                    return {
                        uid: uid,
                        nick: uid + 'Nick',
                        age: 18
                    }
                }
            });
            return profileList.filter(function (profile) {
                return profile !== null;
            });
        });
    });
}

// 现在我们有很多业务都需要根据 uid 获取 userProfile ,
// 大多数业务的需求都是给一个 uid，获取 profile 。
// 为了性能，我们需要把这个单个的请求合并成批量请求。

// 例如，现在页面上 A 模块需要获取 uid 为 1 的 profile，
// B 模块需要 uid 为 2 的 profile，
// C 模块需要获取 uid 为 1 的profile
// 这三个模块会单独调用下面这个方法获取 profile，
// 假设这三次调用的时间非常接近(100ms 以内)，
// 最终要求只发送一个 ajax 请求（只调用一次 requestUserProfile )，
// 拿到这三个模块需要的 profile

// 完成以下方法，接收一个参数 uid，返回一个 Promise，
// 当成功请求到 profile 的时候， resolve 对应的profile , 请求失败 reject
// 例如
// getUserProfile(1).then(function(profile){ console.log(profile.uid === 1) // true });
// 假设请求成功了。

var getUserProfile = (function () {
    // 你需要实现这个方法。
    //节流实现100ms内请求一次
    let uidList = [];
    let promiser;
    let timer;
    function throttle(fn, wait, uid) {
        uidList.push(uid);

        // 节流/防抖实现结果返回
        // 返回promise。
        // 清空作用域链上的存储值

        if(!promiser) {
            promiser =  new Promise((resolve, reject) => {
                // if (!timer) {
                    setTimeout(() => {
                        resolve(fn.call(null, uidList))
                        // timer = null
                        uidList = []
                        promiser = null
                    }, wait)
                // }
            })
        }
        return promiser
    }
    return function(uid) {
        return throttle(requestUserProfile, 100, uid)
            .then(list => {
                return list.find(item => item.uid === uid)
            })
            .then(profile => {
                return new Promise((resolve, reject) => {
                    if (profile) {
                        resolve(profile)
                    } else {
                        reject(null)
                    }
                })
            })
            .catch(e => { Promise.reject(null)})
    }
})()

getUserProfile(1).then(function(profile){ console.log(profile.uid === 1)})
getUserProfile(2).then(function(profile){ console.log('2', profile)})
setTimeout(()=>{
    getUserProfile(3).then(function(profile){ console.log('3', profile) });
}, 2000)



