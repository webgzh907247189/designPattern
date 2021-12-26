/**
 * https://www.bilibili.com/video/BV1EY411s7EY/
 * 
 * https://www.wolai.com/aE1oVmBGkgqPhzQcwmRuJU?theme=light
 */
{
    // 首字母大写   
    type CapitalizeString<T> = T extends `${infer S}${infer K}` ? `${Uppercase<S>}${K}` : T;

    type a1 = CapitalizeString<'handler'>       // Handler
    type a2 = CapitalizeString<'parent'>        // Parent
    type a3 = CapitalizeString<233>             // 233
}

{
    // 获取字符串字面量中的第一个字符
    type FirstChar<S> = S extends `${infer F}${infer Second}` ? `${F}` : never
    type A = FirstChar<'BFE'> // 'B'
    type B = FirstChar<'dev'> // 'd'
    type C = FirstChar<''> // never
}


{
    // 获取字符串字面量中的最后一个字符
    // type sss<S extends string> = S["length"] //? '1' : '2';
    type LastChar<S, L extends string[] = []> = S extends `${infer T}${infer K}`
    ? LastChar<K, [...L, T]> : L extends [...infer L, infer R] ? R : never;
    //LastChar<K> : never
    type A = LastChar<'BFE'> // 'E'
    type B = LastChar<'dev'> // 'v'
    type C = LastChar<''> // never
}

{
    type StringToTuple<S, A extends string[] = []> = S extends `${infer T}${infer K}` ? StringToTuple<K, [...A, T]> : A;
    // 字符串转换为元组类型
    type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
    type B = StringToTuple<''> // []    
}

{
    // type TupleToString<T, S extends string = ''> = T extends [infer H, ...infer K] ? TupleToString<K, `${S}${H}`> : S;
    type TupleToString<T, S extends string = ''> = T extends [infer H, ...infer K] ? H extends string ? TupleToString<K, `${S}${H}`> : '' : S;
    // 将字符串类型的元素转换为字符串字面量类型
    type A = TupleToString<['a', 'b', 'c']> // 'abc'
    type B = TupleToString<[]>              // ''
    type C = TupleToString<['a']>           // 'a'
}

{
    type test1<K extends string> = K['length'] extends 1 ? 1 : 2;
    type test11 = test1<'a'>

    type test22 = '22'['length']
    type test33 = ['1', '2']['length']

    type RepeatString<S extends string, N, R extends string = '', A extends any[] = []> = A['length'] extends N ? R : RepeatString<S, N, `${S}${R}`, [ R, ...A ]>;
    // 复制字符T为字符串类型，长度为C
    type A = RepeatString<'a', 3> // 'aaa'
    type B = RepeatString<'a', 0> // ''
}

{
    // 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
    type SplitString<S, T extends string, I extends any[] = []> = S extends `${infer L}${T}${infer R}` 
    ? SplitString<R, T, [...I, L]> : [...I, S];

    type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
    type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
    type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
    type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
    type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]
}

{
    type LengthOfString<S, L extends string[] = []> = S extends `${infer F}${infer R}` ? LengthOfString<R, [...L, F]> : L['length'];
    // 计算字符串字面量类型的长度
    type A = LengthOfString<'BFE.dev'> // 7
    type B = LengthOfString<''> // 0
}

{
    // 驼峰命名转横杠命名
    // type KebabCase<S, I extends string = ''> = S extends `${infer L}${infer R}` 
    // ? L extends Uppercase<L> ? KebabCase<R, `${I}-${Lowercase<L>}`> : KebabCase<R, `${I}${L}`> : I

    type KebabCase<S, I extends string = ''> = S extends `${infer L}${infer R}` 
    ? KebabCase<R, `${ L extends Uppercase<L> ? `${I}-${Lowercase<L>}` : `${I}${L}` }`> : Remove<I>
    type Remove<S> = S extends `${infer L}${infer R}` ? R : ''

    type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
    type a2 = KebabCase<'OpenFlag'>                 // open-flag

    //字面量类型 和 类型字面量 的区别

    // 字面量类型
    let aa: a1 = 'handle-open-flag'
    // 类型字面量
    type Person = {
        name: string
    }
}

{
    type s = '-' extends '-' ? 1 : 2
    type testStr = Capitalize<'abc'>
    // 横杠命名转化为驼峰命名
    type CamelCase1<S extends string, R extends string = ''> = S extends `${infer F}-${infer L1}${infer L2}` 
    ? CamelCase1<L2, `${R}${F}${Uppercase<L1>}`> : `${R}${S}`;

    type CamelCase<S extends string>= CamelCase1<S> extends `${infer L}${infer R}`? `${Uppercase<L>}${R}` : ''
    type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
    type a2 = CamelCase<'open-flag'>                // OpenFlag
}

{
    // 得到对象中的值访问字符串
    // 简单来说，就是根据如下对象类型：
    /*
    {
        home: {
            topBar: {
                title: '顶部标题',
                welcome: '欢迎登录'
            },
            bottomBar: {
                notes: 'XXX备案，归XXX所有',
            },
        },
        login: {
            username: '用户名',
            password: '密码'
        }
    }
    */
    // 得到联合类型：
    /*
    home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
    */

    // 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
    type Remove<S extends string> = S extends `${infer L}${infer R}` ? R : ''

    type ObjectAccessPaths<S, R extends string = '', K = keyof S> = K extends keyof S ?
            K extends string ? S[K] extends Record<string, any> 
                ? ObjectAccessPaths<S[K],`${R}.${K}`> : Remove<`${R}.${K}`>
        : '' : '';

    function orderFn<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}

    // i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
    const getName = orderFn({
        home: {
            topBar: {
                title: '顶部标题',
                welcome: '欢迎登录'
            },
            bottomBar: {
                notes: 'XXX备案，归XXX所有',
            },
        },
        login: {
            username: '用户名',
            password: '密码'
        }
    })
    getName('home.bottomBar.notes')         
    getName('home.topBar.welcome')        
    getName('home.bottomBar.notes')       

    // i18n('home.login.abc')              // error，不存在的属性
    // i18n('home.topBar')                 // error，没有到最后一个属性
}

{
    // 定义组件的监听事件类型
    // 实现 ComponentEmitsType<Emits> 类型，将
    /*
    {
        'handle-open': (flag: boolean) => true,
        'preview-item': (data: { item: any, index: number }) => true,
        'close-item': (data: { item: any, index: number }) => true,
    }
    */
    // 转化为类型
    /*
    {
        onHandleOpen?: (flag: boolean) => void,
        onPreviewItem?: (data: { item: any, index: number }) => void,
        onCloseItem?: (data: { item: any, index: number }) => void,
    }
    */


    type GetName<S extends string, I extends string = ''> = S extends `${infer L}-${infer R1}${infer R2}` ? GetName<R2, `${I}${L}${Uppercase<R1>}`> : `${I}${S}`;
    type GetUpcaseName<S extends string> = S extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : '';
    type ss1 = GetName<'handle-open-aa-bb'>
    type ss2 = GetUpcaseName<GetName<'handle-open-aa-bb'>>

    type ComponentEmitsType<S> = {[K in keyof S as `${K extends string ? `on${GetUpcaseName<GetName<K>>}` : ''}`]?: S[K] extends (...args: infer A) => any ? (...args: A) => void : S[K]}
    type sss = ComponentEmitsType<{
        'handle-open-aa': (flag: boolean) => true,
        'preview-item': (data: { item: any, index: number }) => true,
        'close-item': (data: { item: any, index: number }) => true,
        'getName': 'test',
        'getNameStr': 'sss'
    }>

    function createComponent<Emits extends Record<string, any>>(emits: Emits): ComponentEmitsType<Emits> {return [{emits}] as any}

    // 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
    const Component = createComponent({
        'handle-open': (flag: boolean) => true,
        'preview-item': (data: { item: any, index: number }) => true,
        'close-item': (data: { item: any, index: number }) => true,
        'name': 'test'
    })
    // const aa: sss = {
    //     onGetName
    // }
    
    console.log(
        <Component
            // onHandleOpen 的类型为 (flag: boolean) => void
            onHandleOpen={val => console.log(val.valueOf())}
            // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
            onPreviewItem={val => {
                const {item, index} = val
                const a: number = item
                console.log(a, index.toFixed(2))
            }}
            // 所有的监听事件属性都是可选属性，可以不传处理函数句柄
            onCloseItem={val => [{val}]} 
        />
    )

    // 提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
    // 比如 Comp 可以接收属性 {name:string, age:number, flag:boolean, id?:string}，其中id为可选属性，那么可以这样写

    const Comp: { (props: { name: string, age: number, flag: boolean, id?: string }): any } = Function as any

    console.log(<Comp name="" age={1} flag/>)           // 正确
    console.log(<Comp name="" age={1} flag id="111"/>)  // 正确
    // console.log(<Comp name={1} age={1} flag/>)          // 错误，name为字符串类型
    // console.log(<Comp age={1} flag/>)                   // 错误，缺少必须属性name:string
}