/**
 * koa 的 delegates
 * 
 * https://juejin.im/post/5b9339136fb9a05d3634ba13
 */

const delegates = require('delegates');

const petShop = {
    dog: {
        name: '旺财',
        age: 1,
        sex: '猛汉',
        bar() {
            console.log('bar!');
        }
    },
}
  
// 将内部对象 dog 的属性、函数
// 委托至暴露在外的 petShop 上
delegates(petShop, 'dog')
.getter('name')
.setter('age')
.access('sex')
.method('bar');


// 访问内部对象属性
console.log(petShop.name)
// => '旺财'

// 修改内部对象属性
petShop.age = 2;
console.log(petShop.dog.age)
// => 2

// 同时访问和修改内部对象属性
console.log(petShop.sex)
// => '猛汉'
petShop.sex = '公主';
console.log(petShop.sex);
// => '公主'

// 调用内部对象函数
petShop.bar();
// 'bar!'


/**
 * delegates 原理
 */
{
    let obj = {}
    let objTest = {name: '11',sex: '22'}
    function proxy(obj,objTest){
        Object.keys(objTest).forEach((key)=>{
            obj.__defineGetter__(key, function(){
                return objTest[key];
            });
        })
    }
    proxy(obj,objTest)
    // obj.name -> 11    obj.sex -> 22
}









/**
 * 使用 Object.defineProperty 实现属性的代理
 */
{
    function access (proto, target) {
        Object.keys(target).forEach((item)=>{
            Object.defineProperty(proto, item, {
                get () {
                    return target[item]
                },
                set (value) {
                    target[item] = value
                }
            })
        })
    }

    var obj = {}
    var objTest = {name: '11',sex: '22'}
    access(obj, objTest)
    // obj.name -> 11    obj.sex -> 22
}




/**
 * koa 中的使用
 * 
 * koa 中，其核心就在于 context 对象，许多读写操作都是基于它进行
 * 
 * koa 中 context.request 的许多属性都被委托在了 context 上
 * 
 * koa 中 context.response 的许多属性和方法都被委托在了 context 上
 */

let objProxy = {}
let objTarget = {
    name: 'xx',
    sex: 'yy',
    getName(){
        return '代理成功'
    },
    testRegexp: /^123213$/,
    c: {s:{key: '123213'}},
    get des(){
        return 'tttt'
    }
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

Object.getOwnPropertyNames(objTarget).forEach((item)=>{
    let itemDesc = Object.getOwnPropertyDescriptor(objTarget,item)
    Object.defineProperty(objProxy,item,itemDesc)
})

var result = objProxy.getName()
console.log(objProxy.name,objProxy.sex,result)