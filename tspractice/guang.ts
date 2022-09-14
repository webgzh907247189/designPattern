export {}

// 想要约束以某个字符串开头的字符串字面量类型
function func(str: `#${string}`){}
func('#sasd')

type tuple = [string, number?];
let ss: tuple = ['2']




{
    // Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，
    // 如果匹配就能从该局部变量里拿到提取出的类型。
    // infer 提取出来的类型是 unknow， 所以后面需要用 & string 进行交叉  或者使用 xx extends String 来进行转换
    // 使用 infer extends 进行简化
    enum Code {
        a = 111,
        b = 222,
        c = 'abc'
    }
    type Res = `${Code}`


    type typeStrToNumber2<T> = T extends `${infer Num}` ? Num : T 
    type typeStrToNumber22 = typeStrToNumber2<Res> // "111" | "222" | "abc"


    type GetArrLen<N, Ele = unknown, A extends unknown[] = []> = `${A["length"]}` extends N ? A['length'] : GetArrLen<N, Ele, [...A, Ele]> 
    type typeStrToNumber11 = GetArrLen<'11'>; // 11


    type StrToNum<T extends string, N extends number = 0> = T extends `${N}` ? N : GetArrLen<T>
    type typeStrToNumber44 = StrToNum<'12'> // 12


    type typeStrToNumber3<T> = T extends `${infer Num extends number}` ? Num : T 
    type typeStrToNumber33 = typeStrToNumber3<Res>  // 'abc' | 111 | 222
}
{

    const list = [{name: '11', age: 1}, {name: '222', age: 2}] as const
    type sss = typeof list[number]['name']

    type UnionValType<T extends readonly any[], K extends keyof T[number] = ''> = T[number][K]
    type UnionValType1 = UnionValType<typeof list, 'name'>
}




// 非常巧妙的办法 L & string 帮助规避了类型的检查


// https://juejin.cn/post/6844903749501059085
//  interface 和 type 区别

// keyof T 是查询索引类型中所有的索引，叫做索引查询。
// T[Key] 是取索引类型某个索引的值，叫做索引访问。
// in 是用于遍历联合类型的运算符。


// any 和 unknow 的区别
// any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，
// 而 any 除了可以接收任意类型的值，也可以赋值给任意类型。
// 类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。


// never 的应用场景 
// 1. 过滤 key 
// 2. 函数传参限制 key


type ooo = {
    name: string,
    age: number
}
const obj: ooo = {
    name: 'ss',
    age: 100
}

function getKeys<T extends Record<any, any>>(obj: T) {
    return Object.keys(obj)// as Array<keyof T>;
}

function getStr(){
    let str = ''

    getKeys(obj).forEach((key) => {
        str += `${str}${key}=${obj[key]}&`
    })
    console.log(str)
}
getStr()

    
function getStrBackup<T extends Record<any, any>>(obj: T){
    let str = ''
    Object.keys(obj).forEach((key) => {
        str += `${str}${key}=${obj[key]}&`
    })
    console.log(str)
    return str
}
getStrBackup(obj)



function getPropValue<T extends object, Key extends keyof T>(obj: T, key: Key): T[Key] {
    return obj[key];
}
getPropValue({name: '1', age: 12}, 'age')







type ParseQueryItem<S> = S extends `${infer L}=${infer R}` ? { [Key in L]: R } : never;
type ss1 = ParseQueryItem<'a=1'>


type MergeVal<V1, V2> = V1 extends V2 ? V1 : [V1 , V2]
type Mergeparams<O extends Record<any, any>, R extends Record<any, any>> = { 
    // [Key in keyof O | keyof R]: O[Key] & R[Key]
    [Key in keyof O | keyof R]: Key extends keyof O ? Key extends keyof R ? MergeVal<O[Key], R[Key]> : O[Key] : Key extends keyof R ? R[Key] : never
}
type ssss1 = Mergeparams<{a: 1, b1: 3}, {b: 2}>
type ssss2 = Mergeparams<{a: 1, b: 2}, {b: 3}>




type ParseQueryString<S> = S extends `${infer L}&${infer R}` ? MergeParams<ParseQueryItem<L>, ParseQueryString<R>> : ParseQueryItem<S>;
type res = ParseQueryString<'a=1&b=2&c=3'>



type MergeValues<One, Other> = 
    One extends Other 
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: 
    Key extends keyof OneParam
        ? Key extends keyof OtherParam
            ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam 
            ? OtherParam[Key] 
            : never
}
type sss1 = MergeParams<{a: 1, b: 3}, {b: 2}>






// 索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，
// 这里 keyof T 取出的索引就是 string | number | symbol 的联合类型，
// 和 string 取交叉部分就只剩下 string 了。就像前面所说，交叉类型会把同一类型做合并，不同类型舍弃。
type MapType<T> = {
    [K in keyof T as `${K & string}${K & string}${K & string}`] : [T[K], T[K], T[K]]
}

type test11 = MapType<{a: 1, b: 2}>;


// GetRefProps
type GetRefProps<Props> = 'ref' extends keyof Props ? Props extends {ref?: infer R} ? R : never :never
type GetRefPropsTest1 = GetRefProps<{ref?: 1, name: 'test'}> // 1

type GetRefProps1<Props> = 'ref' extends keyof Props ? Props['ref'] :never
type GetRefPropsTest22 = GetRefProps1<{ref?: 1, name: 'test'}> // 1 | undefined




// Last
type GetLast1<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type testLast1 = GetLast1<['a', 'b', 'c']>

// 麻烦的写法
type GetLast2<Arr extends unknown[]> = 
    Arr['length'] extends 1 ? Arr[number] : Arr extends [infer L, ...infer R] ? GetLast2<R> : never
type testLast2 = GetLast2<['a', 'b', 'c']>


// PopArr
type PopArr1<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [...infer Rest, unknown] ? Rest : never;
type testPopArr1 = PopArr1<[1,2,3]>

// 麻烦的写法
type PopArr2<Arr extends unknown[], List extends unknown[] = []> = Arr['length'] extends 1 ? List : Arr extends [infer L, ...infer R] ? PopArr2<R, [...List, L]>: never;
type testPopArr2 = PopArr2<[1,2,3]>


// ShiftArr
type ShiftArr1<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [unknown, ...infer Rest] ? Rest : never;
type testShiftArr1 = ShiftArr1<[1,2,3]>

// 麻烦的写法
// type ShiftArr2<Arr extends unknown[], List extends unknown[] = []> = 
//     Arr extends [infer L, ...infer R] ? List['length'] extends 0 ? R : Arr : never;

// type ShiftArr2<Arr extends unknown[]> = Arr extends [infer L, ...infer R] ? R : never;
type ShiftArr2<Arr extends unknown[]> = Arr extends [unknown, ...infer R] ? R : never;
type testShiftArr2 = ShiftArr2<[1,2,3]>



// 匹配任意 string 类型
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
type StartsWithTest = StartsWith<'abc' ,'a'>



type ReplaceStr<Str extends string, From extends string, To extends string> = 
    Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;
type ReplaceStrTest1 = ReplaceStr<'你吃饭了吗', '吃饭' , '喝水'>




type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<`${Rest}`> : Str
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<`${Rest}`> : Str
type TrimStrTest1 = TrimStrLeft<TrimStrRight<'  abc asd   '>>






type Zip<One extends unknown[], Other extends unknown[]> = 
    One extends [infer F1, ...infer Rest1] ? Other extends [infer F2, ...infer Rest2] ? [[F1, F2], ...Zip<Rest1, Rest2>] : [] : []
type ZipTest = Zip<[1, 'guang', 'test1'], [2, 'dong', 'test2']>;





type CapitalizeStr<Str extends string> = Str extends `${infer L}_${infer R}${infer S}` ? `${L}${Capitalize<R>}${CapitalizeStr<S>}` : Str
type CapitalizeStrTest = CapitalizeStr<'dong_dong_dong'>
type CapitalizeStrTestResult = Capitalize<CapitalizeStrTest>

// 麻烦的写法
type CapitalizeStr1<Str extends string, Result extends string = ''> = 
    Str extends `${infer L}_${infer R}${infer S}` ? CapitalizeStr1<S, `${Result}${L}${Capitalize<R>}`> : `${Result}${Str}`
type CapitalizeStrTest1 = CapitalizeStr1<'dong_dong_dong'>
type CapitalizeStrTestResult1 = Capitalize<CapitalizeStrTest1>






type DropSubStr<Str extends string, SubStr extends string> =
    Str extends `${infer L}${SubStr}${infer R}` ? `${L}${DropSubStr<R, SubStr>}` : Str
type DropSubStrTest = DropSubStr<'donngg', 'ng'>


type DropSubStr1<Str extends string, SubStr extends string> = 
    Str extends `${infer Prefix}${SubStr}${infer Suffix}` 
        ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str;
type DropSubStrTest1 = DropSubStr1<'donngg', 'ng'>





type AppendArgument2<Func extends Function, Arg> = Func extends (...args: infer A) => infer R ? (...args: [...A, Arg]) => R : never
type AppendArgumentTest2 = AppendArgument2<(a: string, b :number) => unknown, { c: number}>



type Record<K extends string | number | symbol, T> = { [P in K]: T; }
type Recordtest = Record<any, any>


type UppercaseKey<Obj extends Record<string, any>> = { 
    [Key in keyof Obj as Uppercase<Key & string> | Key & number]: Obj[Key]
}
type UppercaseKeyTest = UppercaseKey<{1: number; name: string}>



// never 的应用场景 
// 1. 过滤 key 
// 2. 函数传参限制 key
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
    [K in keyof Obj as ValueType extends Obj[K] ? K : never]: Obj[K]
}
type FilterByValueTypeTest1 = FilterByValueType<{name: string, age: number}, number>


