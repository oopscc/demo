/**
 * Vue 内部使用了 Object.defineProperty() 来实现双向绑定，通过这个函数可以监听到 set 和 get 的事件。
 */
const data = {}
const imput = document.getElementById('input')
Object.defineProperties(data, 'name', {
    get()  {

    },
    set(val) {
        input.val = val
        this.val = val
    }
})
