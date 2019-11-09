// --strictNullChecks
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以
 
sn = undefined; // error




// 类型联合
type attrStr = 'name' | 'age' | 'sex'
type typeAttr = {
  [K in attrStr]: string
}

type typeAttr1 = Record<attrStr, string>
// Record实现
type MyRecord<S extends string,T> = {
  [I in S]: T
}
type typeAttr2 = MyRecord<attrStr, string>




// nerver
type FunctionPropertyNames1<T> = { [K in keyof T]: T[K] extends Function ? K : never }

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]

interface Part {
  id: number
  name: string
  subparts: Part[]
  updatePart(newName: string): void
}


// 巧用never
type T40 = FunctionPropertyNames<Part>  // 'updatePart'
type T401 = FunctionPropertyNames1<Part>
type T402 = FunctionPropertyNames1<Part>[keyof Part]
type T403 = never | string | number | never



type T41 = NonFunctionPropertyNames<Part>  // 'id' | 'name' | 'subparts'

let testT40: T40 = 'updatePart'






// mixins
// 所有 mixins 都需要
type Constructor<T = {}> = new (...args: any[]) => T

// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now()
  }
}

type isConstructor = typeof User extends Constructor ? true : false // true

// 添加属性和方法的混合例子
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false
    activate() {
      this.isActivated = true
    }
    deactivate() {
      this.isActivated = false
    }
  }
}

// 简单的类
class User {
  name = ''
}

// 添加 TimesTamped 的 User
const TimestampedUser = TimesTamped(User)
// 使用组合类
const timestampedUserExample = new TimestampedUser()
console.log(timestampedUserExample.timestamp)


// 添加 TimesTamped 和 Activatable 的类
const TimestampedActivatableUser = TimesTamped(Activatable(User))
// 使用组合类
const timestampedActivatableUserExample = new TimestampedActivatableUser()
console.log(timestampedActivatableUserExample.timestamp)
console.log(timestampedActivatableUserExample.isActivated)







// Exclude
// 字符串字面量类型允许你指定字符串必须的固定值。在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。
type str1 = 'x' | 'y' | 'z'
type A = Exclude<'x' | 'a', str1>
// type MyExclude<T,U> = 






// 重要
// Readonly，Partial和Pick是同态的，但Record不是。
// 非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。
// Record
type Record<S extends string, T> = {
  [P in S]: T
}
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>



// Pick
type Pick<S, K extends keyof S> = {
  [I in K]: S[I]
}
type userInfo = Pick<Part, 'id' | 'name'>



// Omit & Pick // 删除omit
type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>
type Omit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

interface User {
  id: number
  age: number
  name: string
}
// type PickUser = { age: number; name: string }
type OmitUser = Omit<User, 'id'>



// Pick
type test = Pick<Part, 'id' | 'name'>
export {}








// readOnly
interface InterReadOnly {
  name: string
}
type typeReadOnly = Readonly<InterReadOnly>




// Partial
interface UserPartial {
  id: number
  age: number
  name: string
  readonly test: string
}

type partialType = Partial<UserPartial>
let partialVal: partialType = { id: 1,age: 2,name: '1'}



// Exclude
type ExcludeTest = Exclude<'x' | 'a' | 'c', 'x' | 'y' | 'z'>
let val: ExcludeTest = 'a'



// 提取
interface User1 {
  name: string,
  sex: string
}
interface User2 {
}
type extract = Extract<User1 | User1, User1>
let userInfo: extract = {
  name: '1',
  sex: '2' 
}



// 排除null -> NonNullable
type nullVal = NonNullable<null | undefined | string>
let nullVal1: nullVal = '1'


// typeof -- 获取变量的类型
let obj = {name: '1',sex: 2}
class TestType {
  name: string = 'test'
}
type a = typeof getType // 注意看返回值， 所以需要ReturnType
type aa = typeof obj
type testType = typeof TestType


// ReturnType
function getType(){
  return {name: '1',sex: 2}
}
type userReturnType = ReturnType<typeof getType>
let userReturnTypeVal: userReturnType = {name: '1',sex: 2}


// keyof - 获取类型的键
const data = {
  a: 3,
  hello: 'world'
}
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
get(data, 'a') // 3
// get(data, 'b') // Error


// keyof & typeof
const colors = {
  red: 'red',
  blue: 'blue'
}
type Colors = keyof typeof colors

let color: Colors // 'red' | 'blue'
color = 'red' // ok
color = 'blue' // ok
// color = 'anythingElse' // Error



// in - 遍历键名
interface Square {
  kind: 'square'
  size: number
}

// type res = (radius: number) => { kind: 'square'; size: number }
type res = (radius: number) => { [T in keyof Square]: Square[T] }




// InstanceType -> 只判断结构，来源不管(new 出来的，还是自己写的)
class Person {
  constructor(public name: string){
  }
}
type p = InstanceType<typeof Person>
let p1: p = new Person('1')
let p2: p = {name: '1'}



// instanceof
interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  repeat: string = '张三丰';
  getPaddingString() {
      return 'space';
  }
}
class StringPadder implements Padder {
  age: number = 15
  getPaddingString() {
      return 'string';
  }
}
function getRandomPadder(): Padder {
  return Math.random() < 0.5 ?
      new SpaceRepeatingPadder() :
      new StringPadder();
}
let padder: Padder = getRandomPadder();
//使用 instanceof 类型保护
//编译器自动识别，写代码时自动根据类型提示
if (padder instanceof SpaceRepeatingPadder) {
  console.log(padder.repeat);
}
if (padder instanceof StringPadder) {
  console.log(padder.age);
}


// 使用 instanceof 无法判断
type padder1Type = InstanceType<typeof SpaceRepeatingPadder>
type padder2type = InstanceType<typeof StringPadder>
let padder1 = getRandomPadder();
if (padder1 instanceof SpaceRepeatingPadder) {
  console.log(padder1.repeat);
}
if (padder1 instanceof StringPadder) {
  console.log(padder1.age);
}




// 嵌套接口类型
interface Play {
  name: string
  type: string
}
interface Plays {
  [key: string]: Play
}
let plays: Plays = {
  'hamlet': { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  'othello': { name: 'Othello', type: 'tragedy' }
}























// 交叉类型
function extend<T, U>(first: T, second: U): T & U{
  let result = <T & U>Object.create(null);
  for (let id in first) {
    (result as any)[id] = first[id];
  }

  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result[id]) = second[id];
    }
  }

  return result
}
class Person1 {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
  }
}
var jim = extend(new Person1("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();





// 联合类型
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  return 
}

let pet = getSmallPet();
pet.layEggs(); // okay  已经确定了类型，所以下面报错
// pet.swim();    // error



// 断言
if((<Bird>pet).fly){
  (pet as Bird).fly();
}else{
  (<Fish>pet).swim();
}


// 使用is 可以代替 boolean (parameterName is Type这种形式，parameterName必须是来自于当前函数签名里的一个参数名)
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
function isFish1(pet: Fish | Bird): boolean {
  return (<Fish>pet).swim !== undefined;
}



// 条件类型
type isBool<T> = T extends boolean ? true : false
// type t1 = false
type t1 = isBool<number>
// type t2 = true
type t2 = isBool<false>




// 字典类型
interface Dictionary<T> {
  [index: string]: T
}
const data1: Dictionary<number> = {
  a: 3,
  b: 4,
}




// const enum 维护常量列表 // 常量枚举与普通枚举是不一样的，看编译后的结果
const enum STATUS {
  TODO = 'TODO',
  DONE = 'DONE',
  DOING = 'DOING'
}
function todos(status: STATUS) {
  console.log(status)
}
todos(STATUS.TODO)







type promiseVal<T> = (list: number[]) => Promise<T>
let fun1: promiseVal<number> = (args) => new Promise((r,j) => {
  return r(args[0])
})
console.log(fun1([1]))




// infer 延迟推断
{
  async function stringPromise() {
    return "string promise";
  }
  
  async function numberPromise() {
    return 1;
  }
  
  interface Person {
    name: string;
    age: number;
  }
  
  async function personPromise() {
    return { name: "Wayou", age: 999 } as Person;
  }
  
  type UnPromisify<T> = T extends (args: any) => Promise<infer R> ? R : never; 

  type extractStringPromise = UnPromisify<typeof stringPromise>; // string
  
  type extractNumberPromise = UnPromisify<typeof numberPromise>; // number
  
  type extractPersonPromise = UnPromisify<typeof personPromise>; // Person

}


type VariadicFn<A extends any[]> = (...args: A) => any;
type ArgsType<T> = T extends VariadicFn<infer A> ? A : never;
type ArgsType1<T> = T extends (...args: infer A) => any ? A : never;
 
type Fn = (a: number, b: string) => string;
type Fn2Args = ArgsType<Fn>; // [number, string]
type Fn2Args1 = ArgsType1<Fn>; // [number, string]


const fn1: Fn = (a, b) => {
  return a+b
} 
fn1(1, '1')



//infer
type ParamType<T> = T extends (param: infer P) => any ? P : T
interface User {
  name: string
  age: number
}
type Func = (user: User) => void

type Param = ParamType<Func> // Param = User
type AA = ParamType<string> // string



// infer
type ElementOf<T> = T extends Array<infer E> ? E : never
type TTuple = [string, number]
type ToUnion = ElementOf<TTuple> // string | number















{
  interface Action<T> {
    payload?: T
    type: string
  }
  
  class EffectModule {
    count = 1
    message = 'hello!'
    delay(input: Promise<number>) {
      return input.then(i => ({
        payload: `hello ${i}!`,
        type: 'delay'
      }))
    }
    setMessage(action: Action<Date>) {
      return {
        payload: action.payload.getMilliseconds(),
        type: 'set-message'
      }
    }
  }

  const connect: Connect2 = _m => ({
    delay: (input: number) => ({
      type: 'delay',
      payload: `hello ${input}`
    }),
    setMessage: (input: Date) => ({
      type: 'set-message',
      payload: input.getMilliseconds()
    })
  })
  
  type Connected = {
    delay(input: number): Action<string>
    setMessage(action: Date): Action<number>
  }
  
  const connected: Connected = connect(new EffectModule())

  // 在调用 connect 函数之后，返回的新对象只包含 EffectModule 的同名方法，并且方法的类型签名改变了：
  // type FuncName<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T]

  // type Middle = { [T in FuncName<EffectModule>]: EffectModule[T] }
  
  // type Transfer<T> = {
  //   [P in keyof T]: T[P] extends (input: Promise<infer J>) => Promise<infer K>
  //   ? (input: J) => K
  //   : T[P] extends (action: Action<infer J>) => infer K
  //   ? (input: J) => K
  //   : never
  // }
  
  // type Connect1 = (module: EffectModule) => { [T in keyof Transfer<Middle>]: Transfer<Middle>[T] }


  

  type Connect2 = (module: EffectModule) => {
    [T in keyof fn]: fn[T] extends (input: Promise<infer J>) => Promise<infer K> ? (input: J) => K
    :
    fn[T] extends (action: Action<infer J>) => infer K ? (input: J) => K : never
  }
  
  type FnName<K> = {
    [T in keyof K]: K[T] extends Function ? T : never
  }[keyof K]

  type fn = {
    [K in FnName<EffectModule>]: EffectModule[K]
  }
}








// <注意点>
{
  interface ConfigFn {
    <T>(val: T): T
  }

  let getData: ConfigFn = function<T>(val: T): T{
    return val
  }
  getData<string>('1')
  getData<number>(1)



  // 一旦定义了任意属性，那么已经确定属性和可选属性的类型都必须是他的子集

  // 报错 -> 因为任意属性子集关系
  interface Person {
    name: string
    age?: number
    [propName: string]: string
  }
}