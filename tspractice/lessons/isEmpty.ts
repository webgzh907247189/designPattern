/**
 * https://juejin.cn/post/6965795276921503758
 */

//  object看做不能赋值给基本类型的{}
type A = IsEmptyType<string> // false
type B = IsEmptyType<{a: 3}> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
type G = IsEmptyType<unknown> // false

// unknown 只能赋值 给 unknown 或者 any
type sss1 = {} extends unknown ? 1 : 2
type sss2 = {} extends unknown ? 1 : 2


type sss3 = unknown extends {} ? 1 : 2

// 1. number extends S        过滤出来 string , {a: 3}, object
// 2. keyof S extends never   过滤出来 any, Object
// 3. unknown extends {}      过滤出来 unknown
type IsEmptyType<S> = number extends S ? keyof S extends never ? unknown extends S ? false : true : false : false
type IEmptyType2<S> = number extends S ? keyof S extends never ? S extends {} ? true : false : false : false




type keyofobject1 = keyof {};  // never
type keyofobject2 = keyof object; // never
type keyofobject3 = keyof Object; // 不是 never

type aa11 = string extends {} ? true : false // true
type aa22 = keyof any; // string | number | symbol

type T111 = number extends object ? true : false // false
type T222 = number extends {} ? true : false // true
type T333 = number extends {a: 1} ? true : false // false


type T444 = number extends Object ? true : false // true


type test111 = unknown extends {} ? true : false;
type test222 = unknown extends {} ? true : false;

export {}





const c1: {} = 1 // 赋值成功
const c2: {} = '1' // 赋值成功
const c3: {} = Symbol() // 赋值成功


type t1 = 1 extends {} ? true : false // true
type t2 = '1' extends {} ? true : false // true



type n1 = keyof number
//   ^ type n = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type n2 = keyof Number
//   ^ keyof Number

type T1 = n1 extends n2 ? true : false // true
type T2 = n2 extends n1 ? true : false // true


type T22 = number extends Number ? true : false // true
type T11 = Number extends number ? true : false // false



type T3 = number extends {}  ? true : false // true
