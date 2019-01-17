/**
 * npm install typescript -g
 * tsc --version
 * 
 * tsc --init：它是一个TypeScript项目的配置文件，可以通过读取它来设置TypeScript编译器的编译参数。
 * 
 * 运行tsc，它会在当前目录或者是父级目录寻找tsconfig.json文件。
 * 运行 tsc -p ./greeter.ts.当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
 * 使用tsc -w来启用TypeScript编译器的观测模式，在监测到文件改动之后，它将重新编译。
 * 
 * 
 * 
 * https://juejin.im/post/5c3eca17f265da61461e6707
 */



function greeter(person :string):string {
    return `Hello ${person}`;
}

let user: string = "Jane User";
let result = greeter(user)


{
    let bool: boolean;
    bool = false
}


{
    let arr: Array<number>; //数组泛型
    arr = [1,2,3]

    let arr1: string[];
    arr1 = ['1','2']
}


{
    /**
     * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
     */
    let arrList: [string,Number]
    arrList = ['1',2]

    // console.log(arrList[1].substr(1)) // error 没有 substr 方法

    // arrList[2] = 'false' //error
}



{
    enum Color {Red,Yellow,Pink}
    let c: Color = Color.Pink
    console.log(c) // 拿到下标 (默认情况下，从0开始为元素编号。你也可以手动的指定成员的编号。)
}
{
    /**
     * 全部手动赋值 (下标)
     */
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Green;
}
{
    enum Color {Red = 2, Yellow, Pink}
    let name: string = Color[3]
    console.log(name)
}
{
    enum Color {Red = 'r', Green = 'g', Blue = 'b'}
    let c: Color = Color.Green;
    console.log(c) // g


    let colorName:string = Color[2]
    console.log(colorName) // undefined
}




{
    let str: any
    str = 22132
    str = false
}



{
    let num: Number
    let bool: boolean
    let str: void

    num = null  //error
    bool = undefined  //error

    str = null
    str = undefined
}


/**
 * 
 * 使用 :void来表示一个函数没有一个返回值
 */
function loginfo(message:string):void{
    console.log(message)
}
loginfo('11')






/**
 * 泛型  (参数类型与返回值类型是相同的)
 */
function test<T>(arg:T):T{
    return arg
}
test(1)



