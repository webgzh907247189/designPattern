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




type JoinType<Items, S extends string> = Items extends [infer L extends string, ...infer R] ? `${L}${S}${JoinType<R, S>}` : S
// type JoinType<Items, S extends string, Result = ''> = Items extends [infer L extends string, ...infer R] ? `${JoinType<R, S, `${Result & string}${L}${S}`>}` : Result
declare function join111<S extends string>(str: S): <Items extends string[]>(...list: Items) => JoinType<Items, S>
function join111(str){
    return (list) => {
        return list.join(str)
    }
}
const res = join111('-')('guang', 'and', 'dong');
