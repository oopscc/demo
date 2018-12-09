function bubbleSort(list) {
    for (let outter=list.length; outter>=2; outter--) {
        for(let inner=0; inner<outter-1 ;inner++) {
            if(list[inner] > list[inner +1]) {
                //交换
                let temp = list[inner]
                list[inner] = list[inner+1]
                list[inner+1] = temp
            }
        }
    }
    return list
}
//2. 选择排序
// 两层循环，
// 外层顺序后移数组
// 内层找出外层里的min，与外层第一个元素替换
function selectSort(list) {
    if(!list.length) return [];
    for(let outter=0; outter<list.length - 1; outter++) {
        let min = outter
        for(let inner=outter+1; inner<=list.length -1; inner++) {
            if(list[inner] < list[min]) {
                // swap(list, inner, outer)
                let temp = list[inner]
                list[inner] = list[outter]
                list[outter] = temp
            }
        }
        console.log(list)
    }
    return list
}
//3. 插入排序
// 内外两个循环
// 外层循环：将数组按个移动
// 内层循环：遍历外层循环选中的元素素组， 和他之后的一个元素temp进行比较插入
function insertSort(list) {
    var temp,inner;
    for(var outer=1; outer< list.length; outer++) {
        let temp = list[outer];
        let inner = outer;
        while(inner > 0 && list[inner -1] > temp) {
            list[inner] = list[inner - 1]
            inner--;
        }
        list[inner] = temp
    }
    return list
}
//4. 快速排序
// 选择数组第一个数作为基准值，pivot
// 对列表重新排序，将小于基准的放入lesser数组，将大于基准的放入greater数组
// 链接 lesser + pivot + greater
// 递归 lesser, greater
function qSort(list) {
    if(list.length == 0) return [];
    var pivot = list[0];
    var lesser = [];
    var greater = [];
    for(var i = 1; i < list.length; i++) {
        if(list[i] < pivot) {
            lesser.push(list[i])
        } else {
            greater.push(list[i])
        }
    }
    return qSort(lesser).concat(pivot, qSort(greater))
}
//5. 二路归并排序
//
function mergeSort(list) {
    return list
}
//6. 希尔排序TODO

console.log(mergeSort(arr))


// 判断回文字符串
// 递归。现全部转成小写，然后头尾比较
let a = 'haaH'
function is_hui(ss) {
if(!ss.length) return true;
ss = ss.toLowerCase()
// return ss[0] === ss[ss.length -1] && is_hui(ss.slice(1, ss.length -1))
// return ss.split('').reverse().join('') === ss
// 翻转字符，递归或者使用数组方法
}
console.log(is_hui(a))

// 生成指定长度随机字符
function createAA(n) {
let base = 'abcdefghijklmnopqrstuvwxyz0123456789'
let target = ''
for(let i = 0; i<n; i++) {
    target += base.charAt(Math.round(Math.random()*base.length))
}
return target
}
console.log(createAA(12))

// 统计字符串中出现最多的字符
// 转换成obj， k， 次数为value. 然后找到最大value和key
function stringMax(ss) {
let obj = {}
ss.split('').map(key => {
    if(!obj[key]) {
        obj[key] = 1
    } else {
        obj[key] = obj[key] + 1
    }
})
let min=1,max=0;
for (let key in obj) {
    if(obj[key] > max) {
        max = obj[key]
    }
    if(obj[min] <= min) {
        min = obj[key]
    }
}
console.log(max, min)
}
stringMax('ajsdfhgsas')


// 数组去重
function filter(list) {
let obj = {}
list.map(key => {
    obj[key] = true
})
return Object.keys(obj)
}
// 数组中最大差值
function longer(list) {
let min = list[0],
    max = list[0];
list.map(item => {
    item < min ? min = item : null;
    item > max ? max = item : null;
})
return max - min
}
// 阶乘
function xx(n) {
if(n < 0) return -1;
if(n < 2) return 1;
return n*xx(n-1)
}
// 菲波那切数列
function getfibo(num) {
if(num <= 1) return 1;
if(num > 1 ) {return getfibo(num-1) + getfibo(num-2)}
}
function fibo(n) {
let arr = [];
for(let i = 0; i < n; i++) {
    // arr.push(getfibo(i))
    if(i <=1 ) {
        arr.push(1)
    } else {
        arr.push(arr[i-1] + arr[i-2])
    }
}

return arr
}
console.log(fibo(10))
// 顺序查找

// 二分查找
// 1、先排序
// 2、设置边界，小边界为0，大边界为length-1
// 3、找中界。 mid = Math.floor((min+max)/2)
// 4、递归. find(min, mid) || find(mid, max)
function find(num, arr) {
arr = insertSort(arr)
let low = 0;
let high = arr.length -1;
// if(arr[mid] < num) {
//     return find(num, arr.slice(mid, max))
// } else if(arr[mid] > num) {
//     return  find(num, arr.slice(min, max))
// } else {
//     return mid
// }
while(low <= high) {
    let mid = Math.floor((low+high)/2)
    if(arr[mid] > num) {
        high = mid -1
    } else if(arr[mid] < num) {
        low = mid + 1
    } else {
        return mid
    }
}
return -1;
}
console.log(find(100, arr))

