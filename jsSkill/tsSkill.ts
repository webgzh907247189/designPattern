// https://juejin.im/post/5e913009e51d4546f27ff1f4
// https://juejin.im/post/5eaea6ae5188256d997cbfe5

{
  // Partial
  interface Todo {
    title: string;
    description: string;
    done: boolean;
  }
  const todo: Todo = {
    title: "First Todo",
    description: "this is the first todo",
    done: false,
  };

  type Partial<T> = { [K in keyof T]?: T[K] };

  type ss = Partial<Todo>
  const test1: Partial<Todo> = {
    title: "",
  };
}



{
  // Required
  interface Todo {
    title?: string;
    description?: string;
    done?: boolean;
  }
  type Required<T> = { [K in keyof T]-?: T[K] };
  const test2: Required<Todo> = {
    title: "",
    description: "",
    done: false,
  };
}
{
  // RequiredPick
  interface Todo {
    title?: string;
    description?: string;
    done?: boolean;
  }


  // 范型 只有一个 T
  type RequiredPick<T,F extends keyof T> = { [G in F]-?: T[G] };

  const test2: RequiredPick<Todo, 'description' | 'done'> = {
    // title: "",
    description: "",
    done: false,
  };
}




{
  // Readonly
  interface Todo {
    title: string;
    description: string;
    done: boolean;
  }

  type Readonly<T> = { readonly [K in keyof T]?: T[K] };
  const test3: Readonly<Todo> = {
    title: "",
  };
}



{
  // Record
  // 报错  ->  参考上面的 RequiredPick， 只能有一个 T，P属于没有定义
  type Record1<K extends keyof P, T> = { [F in K]: T } 
  type Record<K extends keyof any, T> = { [F in K]: T }

  type TodoProperty = "title" | "description";

  type Todo = Record<TodoProperty, string>;

  const todo: Todo = {
    title: "First Todo",
    description: "this is the first todo",
  };
}



{
  // Pick
  type Pick<T, K extends keyof T> = { [P in K]: T[P] };
  type TodoProperty = "title" | "description";

  type Todo1 = Pick<Todo, TodoProperty>;

  interface Todo {
    title: string;
    description: string;
    done: boolean;
  }
}


{
    // Omit ->  与 Pick 相反
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
    type TodoProperty = "title" | "description";

    type Todo1 = Omit<Todo, TodoProperty>;

    interface Todo {
        title: string;
        description: string;
        done: boolean;
    }
}


{
    // Exclude
    type Exclude<T, U> = T extends U ? never : T;
    type T0 = Exclude<'a' | 'b' | 'c', 'a'>;  // "b" | "c"
}


{
    // Extract
    type Extract<T, U> = T extends U ? T : never;
    type test1 = Extract<'a' | 'b' | 'c', 'a'>
}


{
    // NonNullable
    type NonNullable<T> = T extends null | undefined ? never : T;

    type test11 = NonNullable<null | undefined | string>
}

{
    // Parameters
    type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
}


{
    // ReturnType
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
}
{
    function putAPI(a: string, b: string){}
    type ArgsType<T> = T extends (...args: infer U) => unknown ? U : never;
    type PutAPIType = ArgsType<typeof putAPI>;

    // 验证
    type s = typeof putAPI
}

{
    // InstanceType
    class C {
        x = 0;
        y = 0;
    }
      
    type test1 = typeof C
    type T0 = InstanceType<typeof C>;  // C
    var s: C = {x: 1, y: 123};
    // var s1: test1 = ;

    
    type T1 = InstanceType<any>;  // any
    
    type T2 = InstanceType<never>;  // any
    
    type T3 = InstanceType<string>;  // error:类型“string”不满足约束“new (...args: any) => any”
    
    type T4 = InstanceType<Function>; // error:类型“Function”不满足约束“new (...args: any) => any”。类型“Function”提供的内容与签名“new (...args: any): any”不匹配
      
    type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
}



1. extends 与 in 的区别 ？？？
T extends U ? X : Y
extends -> 如果T包含的类型 是 U包含的类型的 ‘子集’，那么取结果X，否则取结果Y。


2. never 
never 类型指那些永不存在的值的类型，它是那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型，当变量被永不为真的类型保护所约束时，该变量也是 never 类型

never 类型是任何类型的子类型，所以它可以赋值给任何类型；而没有类型是 never 的子类型


3. infer ???
infer X 就相当于声明了一个变量
{
    // 解读: 如果泛型变量T是 () => infer R的`子集`，那么返回 通过infer获取到的函数返回值，否则返回boolean类型
    type Func<T> = T extends () => infer R ? R : boolean;
    let func1: Func<number>; // => boolean
    let func2: Func<''>; // => boolean
    let func3: Func<() => Promise<number>>; // => Promise<number>
}

{
    type Obj<T> = T extends {a: infer VType, b: infer VType} ? VType : number;
    let obj1: Obj<string>; // => number
    let obj2: Obj<true>; // => number
    let obj3: Obj<{a: number, b: number}>; // => number
    let obj4: Obj<{a: number, b: () => void}>; // => number | () => void   
}


4. unknown ???
"unknown 相对于 any 是安全嗯"，当我们不确定它的类型的时候，可以指定是 any 类型，但是指定了 any 类型之后，
这个值基本上是"废"了，你可以随意对它进行属性方法的访问，不管有的还是没有的，可以把它当做任意类型的值来使用，这往往会产生问题

指定值为 unknown 类型的时候，如果没有通过基于控制流的类型断言来缩小范围的话，是不能对他进行任何操作的，unknown 类型的值不是可以随意操作的

// {
//     const merge = <T,U>(arg1:T,arg2:U):T & U =>{
//         // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点;
//         let res = <T & U>{};
//         // 这里使用Object.assign方法，返回一个合并后的对象；
//         res = Object.assign(arg1,arg2);
//         return res;
//     }

//     const info1 = { 
//         name:"duke"
//     }

//     const info2={
//         age:18
//     }

//     const dukeinfo=merge(info1,info2);

//     console.log(dukeinfo.address);
//     //error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
// }






// https://www.cnblogs.com/wjaaron/p/11672764.html
// ts 枚举
{
  enum Status{
    Off,
    On
  }

  const enum Animal{
      Dog,
      Cat
  }

  const status = Status.On
  const animal = Animal.Dog

  // 编译出来的js是
  // 编译后的代码中并没有像创建Status一样创建了Animal，而是直接把 Animal 中 Dog 值 0 替换到表达式中 Animal.Dog 的位置
  // 这样就节省了生成代码的开销。

  // var Status;
  // (function (Status) {
  //     Status[Status["Off"] = 0] = "Off";
  //     Status[Status["On"] = 1] = "On";
  // })(Status || (Status = {}));
  // var status = Status.On;
  // var animal = 0 /* Dog */;


  // 反向映射
  enum Status1 {
    Success = 200,
    NotFound = 404,
    Error = 500
  }

  console.log(Status1.Success) // 200
  console.log(Status1[200]) // Success
}