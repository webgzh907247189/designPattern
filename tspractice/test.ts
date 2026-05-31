export {}

type GetChars<S> = S extends `${infer Char}${infer Rest}` ? Char | GetChars<Rest> : never;
type sss1 = GetChars<'asdasd'> // "a" | "s" | "d"





type Trim<S extends string> = S extends ` ${infer T}` ? Trim<T> : S extends `${infer T} ` ? Trim<T> : S;
type TrimTest = Trim<'  abc  '>



type GetChars1<S> = GetCharsRec<S, never>;
type GetCharsRec<S, Acc> = S extends `${infer Char}${infer Rest}` ? GetCharsRec<Rest, Char | Acc> : Acc;
type GetChars1Test = GetChars1<'abcd'>






type Reverse<T> = any[] extends T ? T : ReverseRec<T, []>;
type ReverseRec<T, Acc extends unknown[]> = T extends [infer Head, ...infer Tail] ? ReverseRec<Tail, [Head, ...Acc]> : Acc;

// 2, 3, 4, 5, 6, 
type T1 = Reverse<[0, 1, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>;




type Reverse1<T> = T extends [infer L, ...infer R] ? [...Reverse1<R>, L] : T 
// 2, 3, 4, 5, 6, 0, 1, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 
type T11 = Reverse1<[7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>;



type TupleOf<T, N extends number> = number extends N ? T[] : TupleOfRec<T, N, []>;
type TupleOfRec<T, N extends number, Acc extends unknown[]> = Acc["length"] extends N ? Acc : TupleOfRec<T, N, [T, ...Acc]>;
type T2 = TupleOf<any, 44>; // 200


type TupleOf1<T, N extends number, R extends unknown[] = []> = R['length'] extends N ? R : TupleOf1<T, N, [...R, T]>
type T22 = TupleOf1<any, 45>;














// https://note.xiexuefeng.cc/post/ts-union-to-tuple/
// 联合类型 转 元组

// 重载的函数在使用infer进行推断时，重载的部分会取最后一个声明
type FF1 = {
    (): 'b';
    (): 'a';
} // 一个重载的函数类型
type G1 = ReturnType<FF1> // 'a'

// 将相同形状的函数类型进行交叉，等价于函数重载
type FF2 = {
    (): 'b';
    (): 'a';
}
type B = (() => 'b') & (() => 'a') // 函数的交叉
type G2 = FF2 extends B ? true : false // true




type UnionToInterFunction<U> = (U extends any ? (k: () => U) => void : never) extends 
((k: infer I) => void) ? I : never
type UnionToInterFunctionTest = UnionToInterFunction<keyof {name: string, age: number, sex: string}>


type GetUnionLast<U> = UnionToInterFunction<U> extends () => infer A ? A : never
type GetUnionLast1 = GetUnionLast<keyof {name: string, age: number, sex: string}>



type GetObjKay1<P, K extends unknown[] = [], Last = GetUnionLast<P>> = 
    [Last] extends [never] ? K : GetObjKay1<Exclude<P, Last>, [...K, Last]>
type GetObjKay1Tets = GetObjKay1<keyof {name: string, age: number, sex: string}>



