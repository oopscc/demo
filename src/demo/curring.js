
var currying = function(fn) {
    var args = [];
    return function() {
        [].push.apply(args, [].slice.call(arguments));
        if(args.length === fn.length) {
            const _args = args;
            args = []
            return fn.apply(this, _args);
        }
        return arguments.callee
    };
};
function simpleURL(protocol, domain, path) {
    return protocol + "://" + domain + "/" + path;
}

var curried = currying(simpleURL)
console.log(curried('https','haha')('hha'), curried('1')('2',3));

export default function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }

    if (funcs.length === 1) {
      return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

var compose = function(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
