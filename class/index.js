"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * https://juejin.im/post/5b320af251882574dd4ade81
 *
 * https://juejin.im/post/5c6a151f518825625e4ac830  (Taro)
 */
{
    var Cat = /** @class */ (function () {
        function Cat(name) {
            this.name = name;
        }
        Cat.prototype.speak = function () {
            console.log(this.name + ' makes a noise.');
        };
        return Cat;
    }());
    var Lion = /** @class */ (function (_super) {
        __extends(Lion, _super);
        function Lion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Lion.prototype.speak = function () {
            // super 关键字用于调用对象的父对象上的函数
            _super.prototype.speak.call(this);
            console.log(this.name + ' roars.');
        };
        return Lion;
    }(Cat));
    var lion = new Lion;
    lion.speak();
}
/**
 * static 静态方法
 */
{
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.distance = function (a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            console.log(dx, dy);
            return Math.hypot(dx, dy);
        };
        return Point;
    }());
    var p1 = new Point(5, 5);
    var p2 = new Point(10, 10);
    console.log(Point.distance(p1, p2));
}
/**
 * get 属性
 *
 * latest 在初始化的时候已经被运行了，latest 作为 obj 的一个属性来计算后展示，找到了 log 数组的最后一个值
 *
 * get 的使用情况，get 可以在类初始化的使用直接运行，然后作为类的一个属性来使用
 */
{
    var obj = {
        log: ['a', 'b', 'c'],
        get latest() {
            if (this.log.length == 0) {
                return undefined;
            }
            return this.log[this.log.length - 1];
        }
    };
    console.log(obj.latest); //c
    console.log(obj);
    // {
    //    latest: "c"
    //    log: ["a", "b", "c"]
    // }
}
{
    var Login = /** @class */ (function () {
        function Login() {
        }
        Object.defineProperty(Login.prototype, "hasLogin", {
            // 在每次使用这个 class security 的时候 会调用 hasLogin() 来判断是否登录 
            get: function () {
                return '11';
            },
            enumerable: true,
            configurable: true
        });
        Login.prototype.signup = function (params) {
            console.log(params);
        };
        //token存储的键值
        Login.TOKEN_KEY = 'geqwrgfboiadsad';
        return Login;
    }());
    var login = new Login;
    login.hasLogin; // 11
}
/**
 * set 属性
 */
{
    var language = {
        set current(name) {
            this.log.push(name);
        },
        log: []
    };
    language.current = 'EN';
    language.current = 'FA';
    console.log(language.log); // ["EN", "FA"]
}
/**
 * 删除对象属性
 */
{
    var obj_1 = { name: '1', sex: '男' };
    delete obj_1.name;
}
// {
//     let obj: Object = {name: '1',sex: '男'}
//     let result: boolean = (Reflect as any).deleteProperty(obj,'name')
//     console.log(result)
// }
/**
 * defineProperty 在现有对象定义 getter 和 setter
 */
{
    var o = { a: 0 };
    Object.defineProperty(o, "b", {
        get: function () {
            return this.a + 1;
        }
    });
    console.log(o.b); // 1
}
{
    var o = { a: 0 };
    Object.defineProperty(o, "b", {
        set: function (x) {
            this.a = x / 2;
        }
    });
    o.b = 10;
    console.log(o.a); // 5
}
