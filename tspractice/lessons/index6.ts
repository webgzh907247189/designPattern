export {}


type Exclude<T, U> = T extends U ? never : T;
type ExcludeTest = Exclude<'a' | 'b' | 'c', 'a'>

type Extract<T, U> = T extends U ? T : never;
type ExtractTest = Extract<'a' | 'c', 'a' | 'b'>


type NonNullable<T> = T extends null | undefined ? never : T
type NonNullableTest = NonNullable<string | null | undefined>


type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T
const fn = (a: string, b: number) => {return { name: '11'}}
type FnType = typeof fn
type ReturnTypeTest = ReturnType<FnType>


type Parameters<T> = T extends (...args: infer P) => any ? P : never
type ParametersTest = Parameters<FnType>



class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }
}
type ConstructorParameters<T extends new (...args: any) => any> =  T extends new (...args: infer P) => any ? P : never;
type ConstructorParametersTest = ConstructorParameters<typeof Person>


type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never
type InstanceTypeTest = InstanceType<typeof Person>



type Partial<T> = { [K in keyof T] ?: T[K]}
type PartialTest = Partial<{name: string, age: number}>

type DeepPartial<T> = { [K in keyof T] ?: T[K] extends object ? DeepPartial<T[K]> : T[K]}
type DeepPartialTest = DeepPartial<{name: string, age: number, msg: { name: string, age: number }}>
let obj: DeepPartialTest = {name: 's', msg: { age: 1 }}


type Required<T> = { [K in keyof T] -?: T[K]}
type RequiredTest = Required<Partial<{name: string, age: number}>>


type Readonly<T> = { readonly [K in keyof T] : T[K]}
type ReadonlyTest = Readonly<{name: string, age: number}>


type Pick<T,U extends keyof T> = { [P in U] : T[P]}
type PickTest = Pick<{name: string, age: number}, 'name'>


type Record<T extends keyof any, U> = { [P in T]: U }
type RecordTest = Record<'name', string>
type ss = keyof any // string | number | symbol 对象的key 三种类型



// 元祖转联合类型
type ElementOf<T> = T extends Array<infer E> ? E : never
type Tuple1 = [string, number, boolean]
type TupleToUnion = ElementOf<Tuple1>


// 联合类型 转为 交叉类型
type T1 = { name: string }
type T2 = { age: number }
type ToInterSection<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never

type T3 = ToInterSection<{ a: (x: T1) => void, b: (x: T2) => void }>