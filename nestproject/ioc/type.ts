// 表示 是 一个类
export type Type<T> = {
    new (...arg: any[]): T
}

// 这里 表示 的是 类 的 实列
// export type Type1<T extends new (...args: any) => any> = InstanceType<T>

// class A{}
// let a: Type1<typeof A> = new A;
// console.log(a, 'aaa')