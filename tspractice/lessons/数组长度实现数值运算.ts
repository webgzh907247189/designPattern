//https://mp.weixin.qq.com/s/NRGtmuA63YdGks4SvNX0WA
// TypeScript 类型体操：数组长度实现数值运算

// T extends xxx 是给类型参数的约束，表示只能传入这种类型
type BuildArray<N extends Number, Ele = unknown, A extends unknown[] = []> = A["length"] extends N ? A : BuildArray<N, Ele, [...A, Ele]> 

type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length']
type Add1 = Add<2, 3>








type SubtractOther<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Result] ? Result['length'] : 0;


type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Result] ? Result['length'] : 0;
type Subtract1 = Subtract<10, 2>







type Mutiply<
    Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
> = Num2 extends 0 ? ResultArr['length'] : Mutiply<Num1, Subtract<Num2, 1>, [...ResultArr, ...BuildArray<Num1>]>

type Mutiply1 = Mutiply<3, 4>







type Divide<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends 0 ? CountArr['length'] : Divide<Subtract<Num1, Num2>, Num2, [...CountArr, unknown]>
type Divide1 = Divide<30, 5>







type StrLen<
    Str extends string,
    CountArr extends any[] = []
> = Str extends `${infer L}${infer R}` ? StrLen<R, [...CountArr, L]> : CountArr['length']
type StrLen1 = StrLen<'hello world'>







type GreaterThan<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends Num2 ? false : CountArr['length'] extends Num1 ? false : CountArr['length'] extends Num2 ? true : GreaterThan<Num1, Num2, [...CountArr, unknown]>
type GreaterThan1 = GreaterThan<2, 3>
type GreaterThan2 = GreaterThan<5, 3>






type FibonacciLoop<
    PrevArr extends unknown[], 
    CurrentArr extends unknown[], 
    IndexArr extends unknown[] = [], 
    Num extends number = 1
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num> 

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
type Fibonacci1 = Fibonacci<8>















// 重映射
type FilterString<T> = {
    [Key in keyof T as T[Key] extends string ? Key: never]: T[Key];
}
type FilterString1 = FilterString<{name: '11',age: 20}>



type Flip<T extends Record<any, any>> = {
    [Key in keyof T as `${T[Key]}`]: Key
}
type Flip1 = Flip<{name: '11',age: 20}>







// 提取类型
// Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，
// 如果匹配就能从该局部变量里拿到提取出的类型
type GetValType<T> = T extends Promise<infer F> ? F : never;
type PromiseType = Promise<number[]>
type res = GetValType<PromiseType> // number[]



type TrimRight<S extends string> = S extends `${infer Right}${' ' | '\t' | '\n'}` ? TrimRight<Right> : S;
type resRight = TrimRight<'abc   '>;

type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer Left}` ? TrimLeft<Left> : S;
type resLeft = TrimLeft<'  abc'>;


type AllTrim = TrimLeft<TrimRight<'   abc  '>>
