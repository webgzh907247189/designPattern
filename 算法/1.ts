/**
 * https://github.com/sl1673495/blogs/issues/54
 * 
 * https://mp.weixin.qq.com/s/xz7_466C5RBSwiF56ldbDw
 */



type FnType = (a: number, b: string) => number

// type AppendArgument = (fn: FnType) => FnType;

// type AppendArgument<T> = (fn: T) => T;

type AppendArgument<T> = T extends () => infer F ? F : any;

// type AppendArgument<T> = T extends (args: infer K) => any ? K : any;
// type AppendArgument<F> = F extends (...args: infer K)=>infer L ?  L : any
// type AppendArgument<F, A> = F extends (...args: infer K)=>infer L ? (x:A,...args:K)=> L : any

// type AppendArgument<F> = F extends (...args: infer K)=>infer L ? (...args:K)=> L : any



const a: FnType = (number1, string1)  => {
    return number1
}

const b = (bool : boolean)  => {
    return bool
}

const appendArgument: AppendArgument<FnType> = fn => {
    return fn;
}

const FinalFn = appendArgument(a);
console.log(FinalFn(123, 'asdsad'));
// type s1 = ReturnType<typeof appendArgument>;
// FinalFn('12312');


const FinalFn2 = appendArgument(b);
console.log(FinalFn2(true));





type s1 = {name: string}
type s2 = {name: string, age: string}
let s3: s2 = { name: '111', age: '222' } 
let s4: s1 = { name: '111' } 
s4 = s3;
// s3 = s4;

type s5 = (x: s1) => string
type s6 = (x: s2) => string

let s7: s5 = (x) => ''
let s8: s6 = (x) => ''
s7 = s8;



type kkk = string | number | boolean
type ggg = string | number

type jj =  ggg extends kkk ?'aaa':'bbb'











type NonEmptyArray<T> = [T, ...T[]]

const aa111aa: string[] = [] // 将出现编译错误
const aa111aaasdasd: NonEmptyArray<string> = ['asd'] // 将出现编译错误


const bb: NonEmptyArray<string> = ['Hello TS', , , , , , '6'] // 非空数据，正常使用

{
    type Foo = {
        a: number;
        b?: string;
        c: boolean;
       }
       type SetOptional<T,K extends keyof T> = { [ G in K]?:T[G] } & {[H in Exclude<keyof T,K> ]: T[H]}
       // 测试用例
       type SomeOptional = SetOptional<Foo, 'a' | 'b'>;
       var o : SomeOptional = {a:123,b:'',c:true}
       
       
       interface Example {
        a: string;
        b: string | number;
        c: () => void;
        d: {};
       }
       type TypeKeys<T> = T[keyof T];
       type PickByValue<T, V> = Pick<T,
         TypeKeys<{[P in keyof T]: T[P] extends V ? P : never}>
       >;
       type a = PickByValue<Example,string>
       
       type ConditionalPick<E,T> = Pick<E,TypeKeys<{ [ K in keyof E] :E[K] extends T ? K : never}>>
       
       // 测试用例：
       type StringKeysOnly = ConditionalPick<Example, string>;
       //=> {a: string}
       
       
       type Fn = (a: number, b: string) => number
       type AppendArgument<F, A> = F extends (...args: infer K)=>infer L ? (x:A,...args:K)=> L : any
       
       type FinalFn = AppendArgument<Fn, boolean> 
       // (x: boolean, a: number, b: string) => number
       
       type Flat<T> = T extends string ? T : Flat<T[ keyof T]> 
       type NaiveFlat<T extends any[]> =  Flat<T[keyof T]> 
       
       // 测试用例：
       type NaiveResult = NaiveFlat<['f',['a'], ['b', 'c',[[[[[[[['g']]]]]]]]], ['d'],'e']>
       // NaiveResult的结果： "f" | "a" | "b" | "c" | "g" | "d" | "e" 
       
       
       
       type aa = Omit<keyof Object,'undefined'>
       type EmptyObject = {[k in keyof Object]: Object[k]}
       
       // 测试用例
       const shouldPass: EmptyObject = {}; // 可以正常赋值
       const shouldFail: EmptyObject = { // 将出现编译错误
         prop: "TS",
       }
       
       type CheckType<T> = {prop:string} extends T ? {prop:string} : never
       
       type SomeType = {
         prop: string
       }
       
       
       // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
       function takeSomeTypeOnly(x: CheckType<SomeType>) { return x }
       
       // 测试用例：
       const x = { prop: 'a' };
       takeSomeTypeOnly(x) // 可以正常调用
       
       const y = { prop: 'a', addditionalProp: 'x' };
       takeSomeTypeOnly(y) // 将出现编译错误
       
       
       
       
       type NonEmptyArray<T> = [T, ...T[]]
       
       const a: string[] = [] // 将出现编译错误
       const b: NonEmptyArray<string> = ['Hello TS', '6'] // 非空数据，正常使用
}


{
    type SomeType =  {
        prop: string
    }
    
    type Exclusive<T1, T2> = {
        [K in keyof T2]: K extends keyof T1 ? T2[K] : never 
    }

    // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
    function takeSomeTypeOnly1<T>(x: Exclusive<SomeType, T>) { return x }
    
    // 测试用例：
    const x = { prop: 'a' };
    takeSomeTypeOnly1(x) // 可以正常调用
    
    const y = { prop: 'a', addditionalProp: 'x' };
    takeSomeTypeOnly1(y) // 将出现编译错误


    type DispatchType =  {
        type: string
    }

    function dispatch<T extends DispatchType>(x: T) { return x }
    // function dispatch(x: DispatchType) { return x }
    // 斜变
    dispatch({ type: '123' })
    dispatch({ type: '123', aasd: '1312' })


    // type Exclusive<T1, T2 extends T1> = {
    //     [K in keyof T2]: K extends keyof T1 ? T2[K] : never 
    //   }
      
    //   // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
    //   function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) { return x }
      
      
}

{
    type Animal = { name: string }
    type aniFn = (this: Animal) => void;

    type Thatparamstype<T> = {
        [ K in keyof T]: any
    }

    type o2 = Thatparamstype<aniFn>;
}

// {
//     type K3 = keyof { [x: number]: any };  // string | number
// }





type obj = {name: string ,sex: string}
type s11 = Partial<obj>

type SomePartial<T, K extends keyof T> = { [S in K]?: T[S] };
type s22 = SomePartial<obj, 'name'>


type s33 = Omit<Pick<obj, 'name'> & SomePartial<obj, 'sex'>, ''>

type ss1 = Record<'name'| 'sex', string>


{
    type TupleToString<T> = {T: any}
    type A1 = TupleToString<['a', 'b', 'c']> // 'abc
    type B1 = TupleToString<[]>              // ''
    type C = TupleToString<['a']>           // 'a'
}
{
    type TupleToString<T, Prev extends string =''> = T extends [infer L, ...infer R] ? (L extends `${infer LL}` ? TupleToString<R, `${Prev}${LL}`> : '') : Prev;
    type Repeat<StringTuple extends String[], Len extends number, Char extends string> = StringTuple['length'] extends Len ? TupleToString<StringTuple> : Repeat<[...StringTuple, Char],Len, Char>
    type RepeatSrring<Str, Len extends number> = Len extends 0 ? '' : (Str extends `${infer S}` ? Repeat<[Str], Len, Str> : never)

    type RepeatSrring1<Str, Len extends number> = Len extends 0 ? '' : 2
    type A2 = RepeatSrring1<'a', 3> // 'aaa'
    type B2 = RepeatSrring1<'a', 0> // ''
}