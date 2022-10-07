export {}

// 函数的重载 三种写法
declare function func(name: string): string;
declare function func(name: number): number;
func(1)
func('1')



interface func {
    (name: string): string;
    (name: number): number;
}
declare const func2: func
func2(1)
func2('1')



type funcc = ((name: string) => string) & ((name: number) => number)
declare const func3: funcc
func3(1)
func3('1')



// 取重载函数的 ReturnType 返回的是最后一个重载的返回值类型。
type funTest1 = ReturnType<typeof func>
type funTest2 = ReturnType<typeof func2>
type funTest3 = ReturnType<typeof func3>


// U extends U 是触发分布式条件类型，构造一个函数类型，通过模式匹配提取参数的类型，利用函数参数的逆变的性质，就能实现联合转交叉。
// 因为函数参数的类型要能接收多个类型，那肯定要定义成这些类型的交集，所以会发生逆变，转成交叉类型。
type UnionToIntersection<U> = 
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
        ? R
        : never

type UnionToFuncIntersection<T> = UnionToIntersection<T extends any ? () => T : never>;
type UnionToFuncIntersectionTest = UnionToFuncIntersection<'a' | 'b' | 'c'>

type UnionToTuple<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer ReturnType1
        ? [...UnionToTuple<Exclude<T, ReturnType1>>, ReturnType1]
        : [];

type UnionToTupleTest = UnionToTuple<'a' | 'b' | 'c'>





// type JoinType<Items, S extends string> = Items extends [infer L extends string, ...infer R] ? `${L}${S}${JoinType<R, S>}` : S
type JoinType<Items, S extends string, Result = ''> = Items extends [infer L extends string, ...infer R] ? `${JoinType<R, S, `${Result & string}${L}${S}`>}` : Result


type StrToArr<Str extends string, Result extends string[] = []> = Str extends `${infer L}${infer R}` ? StrToArr<R, [...Result, L]> : Result;
type PopArr<List extends string[]> = List extends [... infer L, unknown] ? L : never
type GetStrToArr<List extends string[], Result extends string = ''> = List extends [infer L, ...infer R extends string []] ? GetStrToArr<R, `${Result}${L & string}`> : Result


declare function join111<S extends string>(str: S): <Items extends string[]>(...list: Items) => JoinType<Items, S>
function join111(str){
    return (list) => {
        return list.join(str)
    }
}
const res = join111('-')('guang', 'and', 'dong');

type RemoveFirstDelimiterTest = GetStrToArr<PopArr<StrToArr<"guang-and-dong-">>>



{
    type Obj = {
        a: {
            b: {
                b1: string
                b2: string
            }
            c: {
                c1: string;
                c2: string;
            }
        },
    }

    type AllKeyPath<Obj extends Record<string, any>> = {
        [Key in keyof Obj]: 
          Key extends string
            ? Obj[Key] extends Record<string, any>
              ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
              : Key
            : never
        }[keyof Obj];

    type AllKeyPathTest = AllKeyPath<Obj>
}

{
    type A = {
        aaa: 111,
        bbb: 222
    }


    type B = {
        bbb: 222,
        ccc: 333
    }

    type Defaultize<A, B> = Omit<A, keyof B> & Partial<B>

    // 因为 ts 只有在类型被用到的时候才会去做类型计算，根据这个特点，我们可以用映射类型的语法构造一个一摸一样的索引类型来触发类型计算。
    type Copy<Obj extends Record<string, any>> = {
        [Key in keyof Obj]: Obj[Key]
    }

    type DefaultizeTest = Copy<Defaultize<A,B>>
}