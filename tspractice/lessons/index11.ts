// export {} 
// 带有导出的 直接定义就会报错
// 需要加上下面的配置
export {} 
declare global {
    // 不加 export {}  可以直接写下面的逻辑
    // 加上 需要加一个 declare global{}


    // 利用 interface 自动合并扩展
    interface Window{
        myName: string
        map: string
    }

    interface String{
        double: () => string
    }
}

String.prototype.double = function () {
        return this + this
}
let result = '111'.double()
console.log(result)

console.log(window.myName)

window.map

globalThis.Map


// 给 class 或者 函数 扩展属性
// 使用 namespace 来扩展
class Form {
    useName: Form.Item
    pwd: Form.Item
}

namespace Form{
    export class Item {
    }
}
let item: Form.Item = new Form.Item()




// 使用 namespace 扩展出来的
enum COLORS{
    red = 1,
    yellow = 2
}
namespace COLORS{
    export const pink = 4
}
console.log(COLORS.pink, '使用 namespace 扩展出来的')





{
    interface Obj {
        name: string;
        age: number;
    }
      
    interface Person extends Obj {
        add: string;
    }
      
    const arr: Person[] = [
        {
          name: "Andy",
          age: 12,
          add: "Hangzhou"
        }
    ];
      
    const onChange = <Key extends keyof Person>(v: Person[Key], index: number, key: Key) => {
        // if (arr[index]) {
          arr[index][key] = v;
        // }
    };
}