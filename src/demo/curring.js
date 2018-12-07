
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


