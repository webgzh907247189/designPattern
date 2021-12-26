export {}

type Fish = {name1: string}
type Water = {name2: string}
type Bird = {name3: string}
type Sky = {name4: string}

type Condition<T> = T extends Fish ? Water : Sky


// 条件类型的分发 (裸的类型才会分发)
// 条件类型有一个特性  [分布式有条件类型]  分布式条件类型有一个前提 ，条件类型待检查的类型必须是 naked type parameter (只能是 光秃秃的 T， 否则就不进行分发)
let con1: Condition<Fish | Bird> = { name2: '11', name4: '22' }
let con2: Condition<Fish | Bird> = { name2: '11' }
let con3: Condition<Fish | Bird> = { name4: '11' }


// 分发
type Diff<T,U> = T extends U ? never : T
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'> 
// R = never | neveer | never | 'd'


// 不会分发
type Condition1<T> = T[] extends Fish[] ? Water : Sky
let con11: Condition1<Fish | Bird> = { name2: '11', name4: '22' }
let con22: Condition1<Fish | Bird> = { name2: '11' }
let con33: Condition1<Fish | Bird> = { name4: '11' }

