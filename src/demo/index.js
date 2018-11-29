function Parent (name) {
    this.name = name;
    this.color= ['red', 'gray']
}
Parent.prototype.say = function () {
    console.log('parent: '+this.name)
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

async function aa () {
    console.log(1)
    await new Promise( (a, b) => {

        setTimeout(() => {console.log(2)} )
        a()
    })
    console.log(3)
}
window.b = aa()
