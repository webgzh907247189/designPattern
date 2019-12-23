"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// --strictNullChecks
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn = "bar";
sn = null; // 可以
sn = undefined; // error
let testT40 = 'updatePart';
let partialVal = { id: 1, age: 2, name: '1' };
let val = 'a';
let userInfo = {
    name: '1',
    sex: '2'
};
let nullVal1 = '1';
// typeof -- 获取变量的类型
let obj = { name: '1', sex: 2 };
// ReturnType
function getType() {
    return { name: '1', sex: 2 };
}
let userReturnTypeVal = { name: '1', sex: 2 };
// keyof - 获取类型的键
const data = {
    a: 3,
    hello: 'world'
};
function get(o, name) {
    return o[name];
}
get(data, 'a'); // 3
// get(data, 'b') // Error
// keyof & typeof
const colors = {
    red: 'red',
    blue: 'blue'
};
let color; // 'red' | 'blue'
color = 'red'; // ok
color = 'blue'; // ok
// InstanceType -> 只判断结构，来源不管(new 出来的，还是自己写的)
class Person {
    constructor(name) {
        this.name = name;
    }
}
let p1 = new Person('1');
let p2 = { name: '1' };
class SpaceRepeatingPadder {
    constructor() {
        this.repeat = '张三丰';
    }
    getPaddingString() {
        return 'space';
    }
}
class StringPadder {
    constructor() {
        this.age = 15;
    }
    getPaddingString() {
        return 'string';
    }
}
function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder() :
        new StringPadder();
}
let padder = getRandomPadder();
//使用 instanceof 类型保护
//编译器自动识别，写代码时自动根据类型提示
if (padder instanceof SpaceRepeatingPadder) {
    console.log(padder.repeat);
}
if (padder instanceof StringPadder) {
    console.log(padder.age);
}
let padder1 = getRandomPadder();
if (padder1 instanceof SpaceRepeatingPadder) {
    console.log(padder1.repeat);
}
if (padder1 instanceof StringPadder) {
    console.log(padder1.age);
}
let plays = {
    'hamlet': { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    'othello': { name: 'Othello', type: 'tragedy' }
};
// 交叉类型
function extend(first, second) {
    let result = Object.create(null);
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
class Person1 {
    constructor(name) {
        this.name = name;
    }
}
class ConsoleLogger {
    log() {
    }
}
var jim = extend(new Person1("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
function getSmallPet() {
    return;
}
let pet = getSmallPet();
pet.layEggs(); // okay  已经确定了类型，所以下面报错
// pet.swim();    // error
// 断言
if (pet.fly) {
    pet.fly();
}
else {
    pet.swim();
}
// 使用is 可以代替 boolean (parameterName is Type这种形式，parameterName必须是来自于当前函数签名里的一个参数名)
function isFish(pet) {
    return pet.swim !== undefined;
}
function isFish1(pet) {
    return pet.swim !== undefined;
}
const data1 = {
    a: 3,
    b: 4,
};
function todos(status) {
    console.log(status);
}
todos("TODO" /* TODO */);
let fun1 = (args) => new Promise((r, j) => {
    return r(args[0]);
});
console.log(fun1([1]));
{
    function stringPromise() {
        return __awaiter(this, void 0, void 0, function* () {
            return "string promise";
        });
    }
    function numberPromise() {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
    function personPromise() {
        return __awaiter(this, void 0, void 0, function* () {
            return { name: "Wayou", age: 999 };
        });
    }
}
let data = { dat: '1' };
console.log(dat ? .data.dat ?  ? '1' :  :  : );
