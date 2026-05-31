/**
 * 重学 TypeScript 系列教程
 *
 * https://mp.weixin.qq.com/s/y6C4R04mpvBmyV80p5WOug
 *
 *
 *
 * https://github.com/semlinker/awesome-typescript
 *
 * https://juejin.cn/post/7009046640308781063
 */

// 关键在extends上，如果不用扩展运算符进行返回，并后续覆盖属性的话，函数接收的参数如上述缩写，就会有问题



// 传入的参数 约束为  User 类型(覆盖范围大于 User 类型)， 返回也是 T 类型， 直接返回 User 类型，可能返回的不全
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: "customer",
  };
}


type User = {
  id: number;
  kind: string;
};
type ReturnMake<T, U> = {
  [P in keyof T as P extends keyof U ? P : never]: T[P];
};


type ReturnMake1 = ReturnMake<
  User,
  { id: number; kind: string; sex: string; eat: string }
>;
type ReturnMake2 = ReturnMake<
  { id: number; kind: string; sex: string; eat: string },
  User
>;
// let ss: ReturnMake1 = { id: 1, kind: "1" };



function makeCustomer1<T extends User>(): ReturnMake<User, T> {
  return 11
  // return {
  //   id: 1,
  //   kind: "customer",
  // };
}

function makeCustomer2<T extends User>(): ReturnMake<T, User> {
  return {
    id: 1,
    kind: "customer",
  };
}

function makeCustomer3<T extends User>(u: T): ReturnMake<User, T> {
  // return '11'
  return {
    id: u.id,
    kind: "customer",
  };
}

let s = makeCustomer1(); // 报错 { id: 1, kind: "2", sex: "1" }
// s
// s.kind

makeCustomer({ id: 1, kind: "2", sex: "1", eat: "111" });






