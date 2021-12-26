export {}

/**
 * 差集  利用分发的特性
 * A-B 
 */
type SetDifference<A, B> = A extends B ? never : A;
type A = string | number
type B = number | boolean
type SetDifferenceTest = SetDifference<A, B>


type Omit<T, K> = Pick<T, SetDifference<keyof T, K>>
type Props = {name: string, age: number}
type OmitTest = Omit<Props, 'age'>


type Diff<T, K> = Pick<T, SetDifference<keyof T, keyof K>>
type Props1 = {name: string, age: number, sex: number}
type DefaultProps1 = {name: string}
type DiffProps = Diff<Props1, DefaultProps1>



type Props2 = {name: string, age: number, sex: number}
type DefaultProps2 = {name: string}
type InterSection<T,K> = Pick<K, Extract<keyof T, keyof K> & Extract<keyof K, keyof T>>
type InterSectionTest = InterSection<Props2, DefaultProps2>




// Overwrite
type Props3 = {name: string, age: number, sex: number}
type Props4 = {age: string, other: string}

type Overwrite<T, K> = Omit<T, keyof K> & Pick<K, Extract<keyof K, keyof T>>
type OverwriteTest = Omit<Overwrite<Props3,Props4>, ''>

type Overwrite1<T, K, I = Diff<T, K> & InterSection<T, K>> = I // Pick<I ,keyof I>
type OverwriteTest1 = Omit<Overwrite1<Props3,Props4>, ''>
 



type Merge1<T, K, I = Diff<T, K> & K > = I // Pick<I ,keyof I>
type MergeTest1 = Omit<Merge1<Props3,Props4>, ''>

type Merge<T, K> = Omit<T, keyof K> & K
type MergeTest = Merge<Props3,Props4>
type MergeTest11 = Omit<MergeTest, ''>









namespace test {
    // 分发
    type Compute<A> = A extends () => void ? A : { [K in keyof A]: A[K]}
    type ComputeTest = Compute<{x:'x'} & {y: 'y'}>


    type Props3 = {name: string, age: number, sex: number}
    type Props4 = {age: string, other: string}

    type Merge<A,B> = Compute<B & Omit<A, keyof B>>
    type MergeTest = Merge<Props3, Props4>
}