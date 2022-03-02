export {}
// 非常巧妙的办法 L & string 帮助规避了类型的检查
// 条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会 -> (T extends F ? 1 : 2 触发了 分发) 


type DeepPromiseValueType<T> = T extends Promise<infer R> ? DeepPromiseValueType<R> : T;
type DeepPromiseValueTypetest = DeepPromiseValueType<Promise<Promise<Promise<{sex: boolean, age: number}>>>>


type Awaited<T> = T extends null | undefined ? T : T extends object & { then(onfulfilled: infer F): any } 
            ? F extends ((value: infer V, ...args: any) => any)
            ? Awaited<V>  
            : never
            : T

type DeepPromiseValueTypetest2 = Awaited<Promise<Promise<Promise<{sex: boolean, age: number}>>>>



type ReverseArr<Arr extends unknown[]> = Arr extends [infer L,...infer Rest] ? [...ReverseArr<Rest>, L] : Arr;
type ReverseArrTest = ReverseArr<[1, 2, 3, 4, 5]>


// 自定义组装为 联合类型
type StringToUnion<Str extends string> = Str extends `${infer L}${infer R}` ? L | StringToUnion<R> : never
type StringToUnionTest = StringToUnion<'abcd'>




type ReverseStr<Str extends string, Result extends string = ''> = 
    Str extends `${infer L}${infer R}` ? `${ReverseStr<R>}${L}` : ''
type ReverseStrTest = ReverseStr<'abcd'>





type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}
type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj]: Obj[Key] extends object ? Obj[Key] extends Function ? Obj[Key] : DeepReadonly<Obj[Key]> : Obj[Key]
}
type DeepReadonlyTest1 = DeepReadonly<obj>['a']
type DeepReadonlyTest2 = DeepReadonly<obj>['a']['b']['c']['f']
type DeepReadonlyTest3 = DeepReadonly<obj>['a']['b']['c']['d']





type Camelcase<Str extends string> = Str extends `${infer L}_${infer M}${infer R}` ? `${L}${Uppercase<M>}${Camelcase<R>}` : Str
type CamelcaseUpcase<T extends string> = Capitalize<Camelcase<T>>
type CamelcaseTest11 = CamelcaseUpcase<'aa_aa_aa'>



// 非常巧妙的办法 L & string 帮助规避了类型的检查
type CamelcaseArr<Arr extends unknown[], Result extends unknown[] = []> = 
    Arr extends [infer L,...infer Rest] ? CamelcaseArr<Rest, [...Result, CamelcaseUpcase<L>]> : Result;
type CamelcaseArrTest1 = CamelcaseArr<['aa_aa_aa', 'bb_bb_bb', 'cc_cc_cc']>






// A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
// B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处理，A 和 B 都是同一个，怎么判断都成立。
type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never
type IsUniontest = IsUnion<'a' | 'b' | 'c'> // true



// 数组转联合类型
type ListToUnion = ['a', 'b' ,'c'][number] // "a" | "b" | "c"

type BEM<Block extends string, Element extends string[], Modifiers extends string[]> = `${Block}__${Element[number]}--${Modifiers[number]}`
type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;





type Combination<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`;
type AllCombinations<A extends string, B extends string = A> = 
    A extends A ? Combination<A, AllCombinations<Exclude<B, A>>> : never;

type AllCombinationsTest = AllCombinations<'a' | 'b' | 'c'>





// 三种写法
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [
        // Key in keyof Obj as Key extends `${Key & string}` ? Key : never
        Key in keyof Obj as Key extends `${infer Str}` ? Str : never

        // Key in keyof Obj as Key extends string ? Key : never
    ]: Obj[Key]
}
  
type RemoveIndexSignatureTest = RemoveIndexSignature<{name: string, age: number, 1: number}>






{
    // any 和 unknow 都是顶级类型
    // unknow 类型 只能被赋值给 unknow自己 和 any
    // 想调用 unknow 上面的属性和方法，需要对其 进行类型断言和保护
    // unknown 类型不检查类型的前提， 只能判断是否相等

    // unknown 只能赋值 给 unknown 或者 any
    // 判断是否为any类型
    type ss1 = unknown extends unknown ? '1' : '2'
    type ss2 = unknown extends any ? '1' : '2'
    type ss3 = unknown extends '' ? '1' : '2'
    type ss4 = unknown extends never ? '1' : '2'
    type ss5 = any extends string ? '1' : '2' // "1" | "2"
    type ss6 = [any] extends [string] ? '1' : '2'

    // any 可以赋值给任意类型

    // type IsAny<T> = unknown extends T ? T extends string ? true : false : false
    type IsAny<T> = unknown extends T ? [T] extends [string] ? true : false : false
    // type IsAny<T> = [unknown] extends [T] ? [T] extends [string] ? true : false : false
    type A = IsAny<string> // false
    type B = IsAny<any> // true
    type C = IsAny<unknown> // false
    type D = IsAny<never> // false


    // 简易的判断 写法
    type IsAny1<T> = 'dong' extends ('guang' & T) ? true : false
    type A1 = IsAny1<string> // false
    type B1 = IsAny1<any> // true
    type C1 = IsAny1<unknown> // false
    type D1 = IsAny1<never> // false
    type F1 = IsAny1<'eat'> // false
    type test11 = 'guang' & unknown // 'guang'
}


// 特殊的类型
{
    // never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
    type TestNever<T> = T extends number ? 1 : 2;
    type TestNevertest = TestNever<never> // never

    type IsNever<T> = [T] extends [never] ? true : false
    type IsNeverTest1 = IsNever<never>  // true
    type IsNeverTest2 = IsNever<string> // false


    // any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
    type TestAny<T> = T extends number ? 1 : 2;
    type TestAny1 = TestAny<any> // 1 | 2
}




// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。
{
    type Tupletype1 = ['a', 'b']['length'] // 2
    type ListType1 =  number[]['length'] // number

    type ss = ['a', 'b'][number] // 'a' | 'b'


    type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true;
    type IsTuple<T> = T extends readonly [...params: infer Eles] ? NotEqual<Eles['length'], number> : false
    type IsTupleResult = IsTuple<[1, 2, 3]>;
    type IsTupleResult2 = IsTuple<number[]>;
}



{
    // 复杂的写法
    type GetOptional1<Obj extends  Record<string, any>> = {
        [
            Key in keyof Obj 
                as {} extends Pick<Obj, Key> ? Key : never
        ] : Obj[Key];
    }
    type a1 = GetOptional1<{ foo: number | undefined, bar?: string, flag: boolean }>        // bar
    type aa1 = {} extends Pick<{name: string,  age?: number}, 'age'> ? 1 : 2 // 1
    type aa2 = {} extends Pick<{name: string,  age: number}, 'age'> ? 1 : 2 // 2
    type aaa = Pick<{name: string, age?: number}, 'age'> // {  age?: number | undefined; }

    
    
    type OptionalKeys<T, P = keyof T> = P extends keyof T ? Omit<T, P> extends T ? P : never : never;
    type GetOptional2<Obj extends Record<string, any>> = Pick<Obj, OptionalKeys<Obj>>
    type a2 = GetOptional2<{ foo?: number, bar?: string }> 
    type a3 = GetOptional2<{ foo: number, bar?: string }>       
}


// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
{
    class Dong {
        public name: string;
        protected age: number;
        private hobbies: string[];
      
        constructor() {
          this.name = 'dong';
          this.age = 20;
          this.hobbies = ['sleep', 'eat'];
        }
    }

    type ClassPublicProps<Obj extends Record<string, any>> = {
        [Key in keyof Obj]: Obj[Key]    
    }
    type ClassPublicPropsTest = ClassPublicProps<Dong>
    type ss = keyof Dong; // name
}



// any 可以是任何类型，任何类型也都是 any，所以当这样写判断不出 any 类型来
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
type IsEqualTest = IsEqual<'a' ,any> // true


type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;
type IsEqualTest2 = IsEqual2<'a' ,any> // false




{
    class Person {
        name: string
        // 编译出来没有 this 作为参数的
        getName(this: Person, a: string){
            return 'test' + this.name
        }
    }

    let person = new Person()
    // 此处没做检查
    person.getName.call({id: 1, sex: 'nan'})

    type GetThisParameterType<T> = T extends (this: infer ThisType, ...args) => unknown ? ThisType : never
    type GetThisParameterTypeTest = GetThisParameterType<typeof person.getName> // Person


    type OmitThisParameter<T> = unknown extends ThisParameterType<T> 
        ? T :
        T extends (...args: infer A) => infer R 
            ? (...args: A) => R
            : T;
    type OmitThisParameterTest = OmitThisParameter<typeof person.getName>
    type ss = typeof person.getName
}