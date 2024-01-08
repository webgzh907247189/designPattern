import name, {age, fn} from './etest'
// window.cindex = name + age

// https://juejin.cn/post/7315681269702541323
// export & export deafult 的区别
console.log(name,'111', age)

setTimeout(() => {
    fn('hello world')
    console.log(name, '---', age,'---', 'test1.js')
})