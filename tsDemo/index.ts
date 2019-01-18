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
    /**
     * tsconfig.json 的 strict  对下面的 error 有影响
     */
    let num: Number
    let bool: boolean
    let str: void
    let str1: null
    
    
    // num = null  //error
    // bool = undefined  //error

    // str = null
    str = undefined

    // str1 = '123' //error
    str1 = null
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
test(1)  //(类型推论--即编译器会根据传入的参数自动的帮助我们确定T的类型)
test<Number>(100)  //(传入所有的参数，包含类型参数)










/**
 *  使用泛型变量
 */
function list<T>(arg: T[]):T[]{
    return arg
}
list([123])

function listTest<T>(arg: Array<T>): Array<T>{
    return arg
}
list(['123'])






function listReverse<T>(arg: T[]): T[]{
    return arg.reverse()
}

const sample = [1,2,3]
let reversed = listReverse(sample)

// reversed[0] = '1' // error
// reversed = ['1', '2']; // Error
reversed = [7,8,89]





function listReverseTwo<T>(arg: T[]): T[]{
    return arg.reverse()
}

const slist = [1,'2',3]
let reversedList = listReverseTwo(slist)

// reversedList = [7,8,false] // Error
// reversedList[0] = true     // Error
reversedList = [7,8,'123']




{
    /**
     * 联合类型   (用|分隔每个类型)
     */
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven'
    myFavoriteNumber = 7
    // myFavoriteNumber = true  //error
}




/**
 * error  (length不是string和number的共有属性,所以会报错)
 */
// function getLength(something:string|number):number{
//     return something.length
// }

function getLength(something:string|number):string{
    return something.toString()
}



{   
    /**
     * 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
     */
    let myFavoriteNumber:string|number;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length)

    myFavoriteNumber = 7
    // console.log(myFavoriteNumber.length) // error 类型“number”上不存在属性“length”。
}





function format(cmd: string[] | string){
    let line = ''
    if(Array.isArray(cmd)){
        line = cmd.join(' ').trim();
    }else{
        line = cmd.trim();
    }
}



interface objInter{
    name: string,
    sex?: string
}

function interfaceTest(obj: objInter): string{
    return obj.name
}

let resultName = interfaceTest({name: '111'})




interface funcDemo{
    (name: string,sex: string): string
}

let resultFunc: funcDemo
resultFunc = function(name: string,sex: string){
    return `${name} && ${sex}`
}

resultFunc('张三','男')