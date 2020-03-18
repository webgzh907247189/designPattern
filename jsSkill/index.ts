// https://juejin.im/post/5c611c73f265da2d8f47159b (js小技巧)

/**
 * 代码复用 (组件)
 */
{  
    interface validateInterface{
        (
            schema: Object,
            val: Object    
        ): boolean
    }

    let schema = {
        name: {
            required: true
        },
        sex: {
            required: true
        }
    }

    let validate: validateInterface
    validate = function(schema: Object,val: Object){
        for(let item of Object.keys(schema)){
            if(schema[item]['required']){
                if(!val[item]){
                    return false
                }
            }
        }

        return true
    }

    let result1 = validate(schema,{name: 'xx',sex: 'zz'})
    let result2 = validate(schema,{sex: 'xx'})
    let result3 = validate(schema,{sex1: 'xx'})

    console.log(`${result1},result1,${result2},result2,${result3},result3`)
}



/**
 * 校验规则 (传入的每个字段进行校验)
 * 
 * 当有一个校验失败，此字段不在校验，进行下一个字段校验
 */
// import "reflect-metadata";
{
    interface validateInterface{
        (
            schema: Object,
            val: Object    
        ): string[]
    }

    let schema = {
        name: [
            {required: true,message: '姓名必填1'},
            {
                rule: (data)=>{ 
                    // console.log(data,'data')
                    return false 
                },
                message: '姓名校验2'
            }
        ],
        sex: [
            {required: true,message: '性别必填1'},
            {rule: /^\d{2}$/,message: '性别校验2'},
            {
                rule: (data)=>{ 
                    // console.log(data,'data')
                    return true 
                },
                message: '姓名校验3'
            }
        ]
    }

    let validate: validateInterface
    validate = function(schema: Object,val: Object){
        return Object.keys(schema).reduce((resultList,item)=>{
            let validateResult = schema[item].find((validateItem)=>{
                let ruleType = Object.prototype.toString.call(validateItem.rule).slice(8,-1)

                if(validateItem['required']){
                    if(!val[item]){
                        return validateItem
                    }
                }

                if(ruleType === 'RegExp'){
                    return validateItem.rule.test(val[item])? undefined : validateItem
                }
                if(ruleType === 'Function'){
                    // return (Reflect as any).apply(validateItem.rule,null,[val]) ? undefined : validateItem
                    return validateItem.rule.apply(null,[val]) ? undefined : validateItem
                }
            })
            if(validateResult){
                resultList.push(validateResult)
            }
            return resultList
        },[])
    }

    let result1 = validate(schema,{name: 'xx',sex: 'zz'})
    let result2 = validate(schema,{sex: '12'})
    let result3 = validate(schema,{sex1: '2'})

    console.log(result1,'result1',result2,'result2',result3,'result3')
    // result1 [{rule: ƒ, message: "姓名校验2"},{rule: /^\d{2}$/, message: "性别校验2"}]
    // result2 [{required: true, message: "姓名必填1"}]
    // result3 [{required: true, message: "姓名必填1"},{required: true, message: "性别必填1"}]
}

















/**
 * 数字补0操作
 */
{
    interface funcDemo{
        (num: Number,len?: Number): string
    }

    let addZero1: funcDemo
    addZero1 = function (num: Number, len:Number = 2) {
        return (`0${num}`).slice(-len)
    }

    addZero1(3)     // 03
    addZero1(30,2)  // 30
}

{
    function addZero2 (num: Number, len: Number = 2): string {
        return ((`${num}`) as any).padStart(len , '0')
    }

    addZero2(32,4)  // 0032
}



/**
 * 精确到指定位数的小数 (注意 as any 部分)
 * 
 * 第二个函数适合多种情况 (字符串取指定位数的小数)
 */

{   
    interface r {
        (
            num: number,
            n?: number
        ): number
    }
    let round: r
    round = (num:number,n=2) => {
        return `${Math.round(`${num}e${n}` as any)}e-${n}` as any * 1 // 注意，此处的  e- 没有空格
        // `${Math.round(`${parseFloat(val)}e${num}`)}e-${num}` * 1
    }
}

{   
    interface r {
        (
            num: string,
            n?: number
        ): number
    }
    let round: r
    round = (num:string,n=2) => {
        return `${Math.round(`${parseFloat(num)}e${n}` as any)}e-${n}` as any * 1 // 注意，此处的  e- 没有空格
    }
    //round('1.23123sadsad',2) =>  1.23
}

















/**
 * 判断奇偶数 
 */
{
    const num = 3;
    !!(num & 1)					// true
    !!(num % 2)					// true
}

/**
 * 取整 (不涉及四舍五入)
 */
{
    1.3 | 0   // 1 
    -1.3| 0   // -1
}

/**
 *  双位运算符 ~~ (针对负数存在问题)
 */
{
    Math.floor(4.9) === 4      //true
    // 简写为：
    ~~4.9 === 4      //true

    //对正数来说 ~~ 运算结果与 Math.floor( ) 运算结果相同，而对于负数来说不相同
    ~~4.5            // 4
    Math.floor(4.5)        // 4

    ~~-4.5        // -4
    Math.floor(-4.5)        // -5
}

{
    parseFloat('1.213asdsa')         // 1.213 (取数字部分)
    parseFloat(-4.5 as any)          //-4.5
}

















/**
 * 使用Boolean过滤数组中的所有假值
 */
{   
    let source: Array<any> = [0, 1, false, 2, '', 3, 'a', 'e' as any * 23, NaN, 's', 34, ()=>{
        return 1
    }]

    function compact<T>(arr: T[]): T[]{
        return arr.filter(Boolean)
    }

    let result: Array<any> = compact(source)
    console.log(result) // [1, 2, 3, "a", "s", 34, ƒ]
}

/**
 *  object强制转化为string
 */
{
    // 字符串+Object 的方式来转化对象为字符串(实际上是调用 .toString() 方法)
    'the Math object:' + Math                // "the Math object:[object Math]"
    'the JSON object:' + JSON              // "the JSON object:[object JSON]"

    //可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
    2  * ({ valueOf: ()=>'3' } as any)                // 6
    'J' + { toString: ()=>'S' }                // "JS"
    

    /**
     * 当+用在连接字符串时，当一个对象既有toString方法又有valueOf方法时候，
     * JS通过盲目使用valueOf方法来解决这种含糊。 
     * 
     * 对象通过valueOf方法强制转换为数字，通过toString方法强制转换为字符串
     */
    '' + {toString:()=>'S',valueOf:()=>'J'}                // J
}

/**
 *  string强制转换为数字
 */
{
    // 用*1来转化为数字(实际上是调用.valueOf方法) 然后使用Number.isNaN来判断是否为NaN，或者使用 a !== a 来判断是否为NaN，因为 NaN !== NaN
    // Object.is(NaN,NaN)  -> true
    '32' as any * 1                    // 32
    'ds' as any * 1                    // NaN
    null as any * 1                    // 0
    undefined as any * 1               // NaN
    1  * ({ valueOf: ()=>'3' } as any)       // 3

    // 也可以使用+来转化字符串为数字
    + '123'                   // 123
    + 'ds'                    // NaN
    + ''                      // 0
    + null                    // 0
    + undefined               // NaN
    + { valueOf: ()=>'3' }    // 3
}








/**
 * 数组
 */
// import "reflect-metadata";
{
    interface r {
        (arr: Array<number>): Array<number>
        // (arr: number[]): number[]
    }

    const numbers = [10, 20, 30, 40];
    let getList:r
    getList = function (arr){
        return arr.reduce((result,item)=>{
            let newItem = item * 2
            if(newItem>50){
                result = [...result,newItem]
            }

            return result
        },[])
    }

    let r = getList(numbers)
    console.log(r)
}
{
    interface r {
        (arr: Array<string>): Array<string>
    }

    let cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
    let countList: r
    countList = function(arr){
        return arr.reduce((result,item)=>{
            // let isHave = (Reflect as any).has(result,item)
            let isHave = item in result

            result[item] = isHave ? ++result[item] : 1
            return result
        },Object.create(null))
    }

    let r2 = countList(cars)
    console.log(r2)
}
{
    flatten([1, [2], 3, 4]);                    		  // [1, 2, 3, 4]
    flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);           // [1, 2, 3, [4, 5], 6, 7, 8]

    function flattenOther(arr: any[], depth: number = 1): any[]{
        return depth == 1 
        ? 
        arr.reduce((result,item)=> result.concat(item),[]) : arr.reduce((result,item)=> (Array.isArray(item) && result.concat(flatten(item,depth-1)) || result.concat(item)) ,[]) 
    }

    function flatten(arr: Array<any>, depth: number = 1): Array<any>{
        return depth == 1 
        ? 
        arr.reduce((result,item)=> result.concat(item),[]) : arr.reduce((result,item)=> (Array.isArray(item) && result.concat(flatten(item,depth-1)) || result.concat(item)) ,[])
    }
}
{
    const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
    let {2:country,3: email,length} = csvFileLine.split(',')
    console.log(country,email,length)  // US  john@doe.com  5
}









/**
 * 对象
 * 我们希望删除_internal和tooBig参数。我们可以把它们赋值给internal和tooBig变量，然后在cleanObject中存储剩下的属性以备后用。
 */
{
    let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};
    console.log(cleanObject);                         // {el1: '1', el2: '2', el3: '3'}
}


{
    interface r{
        model?: string,
        engine?: Object
        // vin: string
    }
    let car = {
        model: 'bmw 2018',
        engine: {
            v6: true,
            turbo: true,
            vin: 12345
        }
    }

    let modelAndVIN
    modelAndVIN = ( {model ,engine} :r = {} ):void => {
        console.log(`model: ${model} vin: ${(engine as any).vin}`);
    }


    let modelAndVINTest = ( {model = '1',engine:{vin = '1'} = {}} = {} ) => {
        console.log(`model: ${model} vin: ${vin}`);
    }

    modelAndVIN(car); // => model: bmw 2018  vin: 12345

    modelAndVIN()
}







{
    interface r{
        (obj?: Car | undefined): void
    }
    class Car {
        model: string ='bmw 2018'
        engine: Object = {
            v6: true,
            turbo: true,
            vin: 12345
        }
    }
    let car = new Car()
    let modelAndVIN:r

    modelAndVIN = ( {model ,engine } ) => {
        console.log(model,(engine as any).vin)
    }

    modelAndVIN(car); // => model: bmw 2018  vin: 12345
    modelAndVIN()

    
    let modelAndVINTest = ( {model = '1',engine:{vin = '1'} = {}} = {} ) => {
        console.log(`model: ${model} vin: ${vin}`);
    }
}

{
    interface T{
        (obj?: Car | undefined): void
    }
    class Car {
        model: string ='bmw 2018'
        engine: Engine = {
            v6: true,
            turbo: true,
            vin: 12345
        }
    }
    class Engine {
        v6: boolean
        turbo: boolean
        vin: Number
    }
    let car = new Car()
    let modelAndVIN:T

    modelAndVIN = ( {model ,engine:{vin} } ) => {
        console.log(model,vin)
    }

    modelAndVIN(car); // => model: bmw 2018  vin: 12345
    modelAndVIN()

    
    let modelAndVINTest = ( {model = '1',engine:{vin = '1'} = {}} = {} ) => {
        console.log(`model: ${model} vin: ${vin}`);
    }
}
















/**
 * interface
 */
{
    interface Food {
        name: string;
        calories?: number;
    }
    
    function speak(food: Food): void {
        console.log("Our " + food.name + " has " + food.calories + " calories.");
    }

    speak({name: '123'})
}

/**
 * class
 */
{
    class Menu {
        // 类中的属性:
        // 默认的，它们是public的，也可以是private 或者 protected
        items: Array<string>; // 在菜单中的项目，一个strings类型的数组
        pages: number; // 菜单有多少页面，一个数字
        
        // 构造函数
        constructor(item_list: Array<string>, total_pages: number) {
            // 这里的关键词是强制的
            this.items = item_list;
            this.pages = total_pages;
        }
        
        // 方法
        list(): void {
            console.log("Our menu for today:");
            for(var i=0; i<this.items.length; i++) {
                console.log(this.items[i]);
            }
        }
        
    }
        
    // 创建一个新的‘菜单’类实例
    var sundayMenu = new Menu(["pancakes","waffles","orange juice"], 1);
    // 执行list方法
    sundayMenu.list();



    class HappyMeal extends Menu {
        // 父类属性将会被继承
        // 需要定义一个新的构造函数
        
        constructor(item_list: Array<string>, total_pages: number) {
            // 在这个例子中，我们希望和父类有同样的构造函数
            // 为了更方便额度复制父类的构造函数，这里使用了super函数-引用了父类的构造函数
            super(item_list, total_pages);
        }
        
        // 和属性一样，父类函数也会被继承
        // 当然我们也可以重写list()函数覆盖父类中的方法
        list(): void{
            console.log("Our special menu for children:");
            for(var i=0; i<this.items.length; i++) {
                console.log(this.items[i]);
            }
        }
    }
        
    var menu_for_children = new HappyMeal(["candy","drink","toy"], 1);
    menu_for_children.list();
}


/**
 * 泛型
 */
{
    function test<T>(args: T): T[]{
        let arr :T[] = []
        arr.push(args)
        return arr
    }

    var arrayFromString = test<string>("beep");
    console.log(arrayFromString[0]); // "beep"
    console.log(typeof arrayFromString[0]) // String

    /**
     * 不需要手动的传入的参数的类型（string），因为编译器可以识别到传递了什么参数，并自动决定什么类型最适合它
     */
    var arrayFromNumber = test(42);
    console.log(arrayFromNumber[0]); // 42
    console.log(typeof arrayFromNumber[0]) // number
}








/**
 * https://juejin.im/post/5c6e48865188250f1c358eab
 * 
 * 连等的思考
 */
{
    let obj: object = {name: '1'}

    let objNew = obj;
    (obj as any).m = obj = {sex: '11'}
    
    console.log(obj,objNew)
    // {sex: "11"}  {name: "1",m: {sex: "11"}}

    objNew = {a: '222'}
    console.log(obj,objNew)
    // {a: "222"} {a: "222"}
}



/**
 * this
 */
{
    function testone(): Function{
        console.log(this,'1') // {c: 1}
        return function() {
            console.log(this)
        }
    }
    
    var result = testone.call({c: 1})

    result() // window
    result.call({r: 1}) // {r: 1}
}

{
    function testtwo(): Function{
        console.log(this,'1') // {c: 1}
        return () => {
            console.log(this)
        }
    }
    
    var result = testtwo.call({c: 1})

    result() // {c: 1}
    result.call({r: 1}) // {c: 1}
}


/**
 * JSON.stringify()
 * 
 * toJSON()
 */
{
    var obj = {
        name: '111',
        sex: '22',
        toJSON(){
            return {
                a: '1'
            }
        }
    }
    let r = JSON.stringify(obj)
    console.log(r)
}













// https://juejin.im/post/5c6247ebe51d45012c3cc6a7

/**
 * 如何 clone 一个正则 
 */
{
    let regexp1: RegExp 
    regexp1 = new RegExp('xyz', 'imgyus');
    // 等价于
    let regexp2: RegExp 
    regexp2 = /xyz/imgyus;



    let source = regexp2.source
    // => "xyz"

    let flags = (regexp2 as any).flags  // (正则对象转化为字符串时，其修饰符排序是按字母排序的)
    // => "gimsuy"




    // lastIndex 表示每次匹配时的开始位置。 使用正则对象的 test 和 exec 方法，而且当修饰符为 g 或 y 时， 对 lastIndex 是有影响的
    let regexp = /\d/g;

    regexp.lastIndex
    // => 0 
    regexp.test("123")
    // => true

    regexp.lastIndex
    // => 1
    regexp.test("1")
    // => false
}

{
    // lodash 的实现 clone 正则
    interface  regDemo{
        (regexp: RegExp): RegExp
    }

    const reFlags = /\w*$/
    let cloneRegExp: regDemo

    cloneRegExp = function (regexp: RegExp) {
        const result = new (regexp as any).constructor(regexp.source, reFlags.exec(regexp as any))
        result.lastIndex = regexp.lastIndex
        return result
    }

    cloneRegExp(/xyz/gim)
}   