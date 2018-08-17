class MVVM {
    constructor(options) {
        // 先把 el 和 data 挂在 MVVM 实例上
        this.$el = options.el;
        this.$data = options.data;

        // 如果有要编译的模板就开始编译
        if (this.el) {
            // 数据劫持，就是把对象所有的属性添加 get 和 set
            new Observer(this.$data);

            // 将数据代理到实例上
            this.proxyData(this.$data);

            // 用数据和元素进行编译
            new Compile(this.el, this);
        }
    }
    proxyData(data) { // 代理数据的方法
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            });
        });
    }
}




/**
 * 将属性绑定到this身上  (某些场景，批量往windos添加属性)
 *  
 * 注意configurable 设置为true   (不设置为true的话只能运行一次,第二次设置报错)
 *
 * configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
 *
 * writable    如果设置为fasle，就变成只读了。   (某些场景，禁止用户更改什么信息 ->  userID cookie之类的)
 */

// var obj = {name: '11',sex: 'nan'}
// var _this = this
// var o = {
//     proxyData(data) {
//         Object.keys(data).forEach(key => {
//             Object.defineProperty(_this, key, {
//                 configurable: true,
//                 get() {
//                     return data[key];
//                 },
//                 set(newVal) {
//                     data[key] = newVal;
//                 }
//             });
//         });
//     }
// }
// o.proxyData(obj)
// console.log(this.name,'name',this.sex)