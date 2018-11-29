/**
 * 1、闭包标记timer， settimeout后执行
 * 2、call改变this，arguments
 * 3、立即执行，callNow != timer
 */
function debounce(fn, wait, immediate) {
    let timer, result;
    return function() {
        let context = this;
        let args = arguments;
        if(timer) {
            clearTimeout(timer);
        }
        if(immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if(callNow) result = fn.apply(context, args)
        } else {
            timer = setTimeout(() => {
                result = fn.apply(context, args)
            }, wait)
        }
        return result
    }
}

/**
 * 节流两种方式，1、时间戳 2、定时器
 */
function throttle(fn, wait, immediate) {
    let context,args;
    let previous = 0;
    let timer;
    return function() {
        context = this;
        args = arguments;
        let now = new Date()*1
        if(now - previous > wait) {
            fn.apply(context, args)
            previous = now
        }

        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }


        let remain = wait - (now - previous)
        let later = function() {
            previous = +new Date();
            timer = null;
            fn.apply(context, args)
        }
        if(remain <=0) {
            if(timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(context, args)
            previous = now
        } else if(!timer){
            timer = setTimeout(later, remain)
        }

    }
}
