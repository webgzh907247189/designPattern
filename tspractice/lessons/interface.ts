type C1 = { name: string; age: number; visit: boolean } 
type C2 = { name: string; age: number; sex: number } 


// 交集
type Intersection<T, P> = Pick<T, Extract<keyof T, keyof P>>
type C3 = Intersection<C1, C2>


// 差集 1
type Diff1<T, P> = Omit<T, Extract<keyof T, keyof P>>
type C4 = Diff1<C1, C2>


type Diff2<T, P> = Pick<T, Exclude<keyof T, keyof P>>
type C5 = Diff2<C1, C2>



// 差集 2
type Diff3<T, P> = Omit<T, Extract<keyof T, keyof P>> & Omit<P, Extract<keyof T, keyof P>>
type C6 = Omit<Diff3<C1, C2>, ''>



// 并集
type C7 = Omit<C1 & C2, ''>

type Compute<A> = A extends Function ? A : { [K in keyof A]: A[K] } 
type Merge<T, P> = Compute<T & Omit<P, keyof T>>
type C8 = Merge<C1, C2>






type C33 = { name: string; age: number; visit: boolean } 
type C44 = { name: string; age: string; sex: number } 

type Overwrite<T, P, I = Diff2<T,P> & Intersection<T, P>> = Pick<I, keyof I>
type C9 = Overwrite<C33, C44>

type C10 = Omit<C44 & Omit<C33, keyof C44>, ''>