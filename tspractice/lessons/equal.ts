// https://github.com/type-challenges/type-challenges


type Include<T extends any[], K extends any> = T extends [infer L, ...infer R] ? 
        [L] extends [K] ? [K] extends [L] ? true : false
    : R extends any[] ? Include<R, K> : false : false;

type ss = Include<['a','b','c'], 'c'>


type a = Include<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>
type b = Include<['Kars', 'Esidisi','Wamuu', 'Santana'], 'Dio'>
type c = Include<[1, 2, 3, 5, 6, 7], 7>
type d = Include<[1, 2, 3, 5, 6, 7], 4>
type e = Include<[1, 2, 3], 2>
type f = Include<[1, 2, 3], 1>
type g = Include<[{}], { a: 'A' }>
type h = Include<[boolean, 2, 3, 5, 6, 7], false>
type i = Include<[true, 2, 3, 5, 6, 7], boolean>
type o = Include<[false, 2, 3, 5, 6, 7], false>
type s = Include<[{ a: 'A' }], { readonly a: 'A' }>
type w = Include<[{ readonly a: 'A' }], { a: 'A' }>




type Include1<T extends any[] = [], K extends any = ''> = T extends [infer L] ? 
        (L extends K ? K extends L ? '111' : '222' : '333')
        // L   
    : '444'
type i1 = Include1<[true], boolean>



type aa = boolean extends true ? '1' : '2'

// boolean 是联合类型
type test<T, K> = T extends K ? '111' : '222'
type test11 = test<boolean, true> // 触发分布式   // boolean 是联合类型
type test22 = test<true, boolean>




type B = false | true extends boolean ? true : false; // true
type B1<T = boolean,K = true> = T extends K ? '111' : '222'; // true
type B11 = B1


type sss = [{ readonly a: 'A' }] extends [{ a: 'A' }] ? 1 : 2
type ssss = keyof { readonly a: 'A' }['a']




type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type ssss111s = Equal<{ readonly a: 'A' }, { a: 'A' }>






type UnionToIntersection<U> = (U extends U ? (arg: U) => any: never) extends (arg: infer T) => any
  ? T
  : never;

// 测试用例
type U0 = UnionToIntersection<string | number> // never

type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }
// <string | number> 在 (U extends U ? (arg: U) => any: never)  
//这一段变成了 string extends string | number ? (arg: string) => any 
//| number extends string | number ? (arg: number) => any  , 
//计算结果为 
//(arg: string) => any | (arg: number) => any ， 
//然后在 (arg: infer T) => any 逆变了下， T inter 为 string & number , string & number 就是 never