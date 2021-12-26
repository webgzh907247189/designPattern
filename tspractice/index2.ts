/**
 * https://www.bilibili.com/video/BV1db4y1B7ca/
 * 
 * https://www.wolai.com/vTLcirN6qGbd2mp7wqwzwV
 */

{
    // 计算元组类型的长度
    type LengthOfTuple<L> = L extends any[] ? L['length'] : 0;
    type A = LengthOfTuple<['B', 'F', 'E']> // 3
    type B = LengthOfTuple<[]> // 0
}

{
    type FirstItem<T> = T extends [infer L, ...infer R] ? L : '';
    // 得到元组类型中的第一个元素
    type A = FirstItem<[string, number, boolean]> // string
    type B = FirstItem<['B', 'F', 'E']> // 'B'
}

{
    type GetLast<L> = L extends [infer L, ...infer R] ? L : never;
    type LastItem<T, I extends any[] = []> = T extends [infer L, ...infer R] 
    ? LastItem<R, [L, ...I]> : GetLast<I>;
    // 得到元组类型中的最后一个元素
    type A = LastItem<[string, number, boolean]> // boolean
    type B = LastItem<['B', 'F', 'E']> // 'E'
    type C = LastItem<[]> // never
}

{
    // 移除元组类型中的第一个类型
    type Shift<I> = I extends [infer L, ...infer R] ? [...R] : [];
    type A = Shift<[1, 2, 3]> // [2,3]
    type B = Shift<[1]> // []
    type C = Shift<[]> // []
}

{
    // 在元组类型T中添加新的类型I
    type Push<L, N> = L extends number [] ? [...L, N] : ''
    type A = Push<[1,2,3], 4> // [1,2,3,4]
    type B = Push<[1], 2> // [1, 2]
}

{
    type ReverseTuple<I, E extends any[] = []> = I extends [infer L, ...infer R] ? ReverseTuple<R, [L, ...E]> : E;
    // 反转元组
    type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
    type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
    type C = ReverseTuple<[]> // []
}

{
    type Flat<Z extends any[], I extends any[] = []> =  Z extends [infer L, ...infer R] 
    ? L extends any[] ? [...Flat<L,[...I]>, ...Flat<R>] : Flat<R,[...I, L]> : I
    
    // 拍平元组
    type A = Flat<[1, 2, 3]> // [1,2,3]
    type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
    type C = Flat<[]> // []
    type D = Flat<[1]> // [1]
}

{
    // 复制类型T为C个元素的元组类型
    type Repeat<S, N, I extends any[] = []> = I['length'] extends N ? I : Repeat<S, N, [...I, S]>
    type A = Repeat<number, 3> // [number, number, number]
    type B = Repeat<string, 2> // [string, string]
    type C = Repeat<1, 1> // [1]
    type D = Repeat<0, 0> // []
}

{
    type ss = any extends string ? '1' : '2'
    // 保留元组类型T中的A类型
    // 判断any 是不是 any 类型
    type Filter<I, T, S extends any[] = []> = I extends [infer L, ...infer R] 
    ? L extends T ? Filter<R, T, [...S, L]> : Filter<R, T, [...S]> : S;
    type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
    type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
    type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']
}

{
    type Equal<S, T> = S extends T ? T extends S ? true : false
    

    // 找出E类型在元组类型T中的下标
    type A = [any, never, 1, '2', true]
    type B = FindIndex<A, 1> // 2
    type C = FindIndex<A, 3> // never
}

{
    
    type ss<I extends string[]> = {[K in keyof I[number]]: K extends true ? number : string}
    type ss1= ss<['name', 'age']>

    type TupleToEnum<I extends string[], B extends boolean = false> = {
        [K in keyof I]: string
    }
    // 元组类型转换为枚举类型
    // 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型
    type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>
    // -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

    // 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
    type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>
    // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
}

{
    // 截取元组中的部分元素
    type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>          // [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型
    type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>          // [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型
    type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>          // [never,1]                        从第1个位置开始，保留到第2个位置的元素类型
    type A4 = Slice<[any, never, 1, '2', true, boolean], 2>             // [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型
    type A5 = Slice<[any], 2>                                           // []                               从第2个位置开始，保留后面所有元素类型
    type A6 = Slice<[], 0>                                              // []                               从第0个位置开始，保留后面所有元素类型
}

{
    // 删除并且替换部分元素
    type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
    type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   // [string,undefined,never]                     从第1开始删除，删除3个元素
    type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3
}