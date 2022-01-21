/**
 * https://gitee.com/martsforever-study/typescript-practice/blob/master/exercises/part_03.md
 * https://www.bilibili.com/video/BV1yq4y1q7bU?spm_id_from=333.999.0.0
 */

{
    // 获取对象类型中的可选属性的联合类型
    type OptionalKeys<T, P = keyof T> = P extends keyof T ? Omit<T, P> extends T ? P : never : never
    type a1 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // bar
    type a2 = OptionalKeys<{ foo: number, bar?: string }>                                   // bar
    type a3 = OptionalKeys<{ foo: number, flag: boolean }>                                  // never
    type a4 = OptionalKeys<{ foo?: number, flag?: boolean }>                                // foo|flag
    type a5 = OptionalKeys<{}>                                                              // never
}

{
    // 保留一个对象中的可选属性类型
    type OptionalKeys<T, P = keyof T> = P extends keyof T ? Omit<T, P> extends T ? never : P : never
    type PickOptional<S> = Omit<S, OptionalKeys<S>>
    type a1 = PickOptional<{ foo: number | undefined, bar?: string, flag: boolean }>        // {bar?:string|undefined}
    type a2 = PickOptional<{ foo: number, bar?: string }>                                   // {bar?:string}
    type a3 = PickOptional<{ foo: number, flag: boolean }>                                  // {}
    type a4 = PickOptional<{ foo?: number, flag?: boolean }>                                // {foo?:number,flag?:boolean}
    type a5 = PickOptional<{}>                                                              // {}
}

{

    type OptionalKeys<T, P = keyof T> = P extends keyof T ? Omit<T, P> extends T ? never : P : never 
    type RequiredKeys<T> = Extract<keyof T, OptionalKeys<T>>

    // 获取对象类型中的必须属性的联合类型
    type a1 = RequiredKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // foo|flag
    type a2 = RequiredKeys<{ foo: number, bar?: string }>                                   // foo
    type a3 = RequiredKeys<{ foo: number, flag: boolean }>                                  // foo|flag
    type a4 = RequiredKeys<{ foo?: number, flag?: boolean }>                                // never
    type a5 = RequiredKeys<{}>  

    type a6 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>
}

{
    type OptionalKeys<T, P = keyof T> = P extends keyof T ? Omit<T, P> extends T ? never : P : never
    type PickRequired<T> = Pick<T, OptionalKeys<T>>
    // 保留一个对象中的必须属性
    type a1 = PickRequired<{ foo: number | undefined, bar?: string, flag: boolean }>        // {foo:number|undefined,flag:boolean}
    type a2 = PickRequired<{ foo: number, bar?: string }>                                   // {foo:number}
    type a3 = PickRequired<{ foo: number, flag: boolean }>                                  // {foo:number,flag:boolean}
    type a4 = PickRequired<{ foo?: number, flag?: boolean }>                                // {}
    type a5 = PickRequired<{}>    
}

{
    type Merge<T, K> = K & Omit<T, keyof K>
    // 合并两个对象类型T以及K，如果属性重复，则以K中属性类型为准
    type obj1 = {
        el: string,
        age: number
    }
    
    type obj2 = {
        el: HTMLElement,
        flag: boolean
    }
    
    type obj3 = Omit<Merge<obj1, obj2>, ''>   // {el:HtmlElement,age:number,flag:boolean}
    
    const a = {...{} as obj3}
    console.log(a.el.scrollTop, a.age.toFixed(0), a.flag.valueOf())
    // console.log(a.el.charAt(0))     // error
}

{
    // 所有类型都不能赋值 给 never 类型
    // 判断是否为never类型
    type ss = any extends never ? '1' : '2'
    type IsNever<T> = [T] extends [never] ? true : false
    type A = IsNever<never> // true
    type B = IsNever<string> // false
    type C = IsNever<undefined> // false
    type D = IsNever<any> // false
}

{
    // 判断是否为没有属性的对象类型{}
    type ss = keyof {} // never
    type sss = keyof object
    type tt1 = keyof any
    type tt2 = keyof '111'
    type tt3 = keyof unknown
    type ss2 = [unknown] extends [unknown] ? '1' : '2'

    type ss3 = number extends {} ? '1' : '2'
    type ss4 = number extends object ? '1' : '2'

    
    type IsEmptyType<T> = [keyof T] extends [never] ? [unknown] extends [T] ? false : (number extends T ? true : false) : false
    type A = IsEmptyType<string> // false
    type B = IsEmptyType<{ a: 3 }> // false
    type C = IsEmptyType<{}> // true
    type D = IsEmptyType<any> // false
    type E = IsEmptyType<object> // false
    type F = IsEmptyType<Object> // false
    type G = IsEmptyType<unknown> // false
}

{
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
}

{
    type asyncMethodFn1<T, U> = (input: Promise<T>) => Promise<Action<U>>;
    type asyncMethodFn2<T, U> = (input: T) =>  Action<U>;

    type syncMethod1<T, U> = (action: Action<T>) => Action<U>;
    type syncMethod2<T, U> = (action: T) => Action<U>;

    type Find<S> = S extends asyncMethodFn1<infer T, infer U> ?  <T, U>(input: T) =>  Action<U> : S extends syncMethod1<infer T, infer U> ? <T, U>(action: T) => Action<U>: never;
    type Methods<T> = { [P in keyof T] : T[P] extends Function ? P : never}[keyof T];
    type KeyofMethods = Methods<Module>
 
    type Funkeys<T, K = keyof T> = K extends keyof T ? T[K] extends (...args: any) => any ? K : never : never 
    type Methods1<T> = { [K in Funkeys<T>]: T[K] }
    type KeyofMethods1 =  Methods1<Module>

    type Connect<T> = {
        [I in KeyofMethods]: Find<Module[I]>
    }
    // 实现Connect类型，能够自动地转化Redux Module对象中的函数类型
    interface Module {
        count: number;
        message: string;
    
        asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    
        syncMethod<T, U>(action: Action<T>): Action<U>;
    }

    interface Action<T> {
        payload?: T;
        type: string;
    }
    
    type Result1 = Omit<Connect<Module>, ''>
    // 这个要求的结果
    type Result = {
        asyncMethod<T, U>(input: T): Action<U>;
        syncMethod<T, U>(action: T): Action<U>;
    }
    
    // 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
    // 只要函数类型的属性；
    // 如果函数是异步函数，要求自动解析出来Promise中的类型；
}


{
    // 有且只有一个属性
    // 实现一个叫做 UnionToBooleanProps 的泛型，使得以下需求成立

    type UnionToBooleanProps<T extends string, K extends string = T> = K extends T ? ( ({ [K in K]: true }) & ({ [K in Exclude<T, K>]?: never }) ) : never
    type MessageStringType = "info" | "success" | "warning" | "error";
    type OneMessageTypes = UnionToBooleanProps<MessageStringType>
    type Props = OneMessageTypes & { id: string; }
    function Component(props: Props) {
        return <></>
    }

    const a = <Component id="abc" info/>           //correct
    const b = <Component id="abc" success/>        //correct
    const c = <Component id="abc"/>                //wrong
    const d = <Component id="abc" info success/>   //wrong

    // 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；
}

{
    // 将联合类型转换为交叉类型
    type UnionToIntersection<T> = (T extends any ? (p: T) => any : never) extends (P: infer P) => any ? P : never
    type A = UnionToIntersection<{a: number} | {b: boolean} | {c: string}> 
    // {a: string} & {b: string} & {c: string}
}

{
    // 得到联合类型中的最后一个类型
    type UnionPop<T> = (T extends any ? (p: T) => any : never) extends (P: infer P) => any ? P : never
    type a = 1 | 2 | 3
    type b = UnionPop<a>;       // 3
}

{
    type UnionToTuple<T> = T extends any ? (p: T) => any : never
    // 联合类型转换为元组类型
    type a = UnionToTuple<1 | 2 | 3>                      // [1,2,3]
    type b = UnionToTuple<1 | string | boolean>           // [1,string,boolean]
}


{
    interface Foo {
        [key: string]: any;
        [key: number]: any;
        bar(): void;
      }
      
      type RemoveIndexSignature<T> ={ [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K] }
      
      type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ bar: () => void; }
}