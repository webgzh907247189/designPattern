/**
 * https://juejin.im/post/5b320af251882574dd4ade81
 * 
 * https://juejin.im/post/5c6a151f518825625e4ac830  (Taro)
 * 
 * https://juejin.im/post/5c55512af265da2deb6a7dc8  (NodeJS Events模块源码学习)
 */
{
    class Cat {
        name: string | undefined
        constructor(name?: string) {
            this.name = name;
        }

        speak(): void {
            console.log(this.name + ' makes a noise.');
        }
    }
      
    class Lion extends Cat {
        speak(): void {

            // super 关键字用于调用对象的父对象上的函数
            super.speak();


            console.log(this.name + ' roars.');
        }
    }
    let lion = new Lion
    lion.speak()
}






/**
 * static 静态方法
 */
{
    class Point {
        x: number
        y: number
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    
        static distance(a: Point, b: Point) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            console.log(dx,dy)
        
            return (Math as any).hypot(dx, dy);
        }
    }
    
    const p1 = new Point(5, 5);
    const p2 = new Point(10, 10);
    console.log(Point.distance(p1, p2));    
}






/**
 * get 属性
 * 
 * latest 在初始化的时候已经被运行了，latest 作为 obj 的一个属性来计算后展示，找到了 log 数组的最后一个值
 * 
 * get 的使用情况，get 可以在类初始化的使用直接运行，然后作为类的一个属性来使用
 */
{
    var obj = {
        log: ['a', 'b', 'c'],
        get latest() {
            if (this.log.length == 0) {
                return undefined;
            }
            return this.log[this.log.length - 1];
        }
    }
      
    console.log(obj.latest);  //c

    console.log(obj)
    // {
    //    latest: "c"
    //    log: ["a", "b", "c"]
    // }
}

{
    class Login {
        //token存储的键值
        static TOKEN_KEY = 'geqwrgfboiadsad';
        
        // 在每次使用这个 class security 的时候 会调用 hasLogin() 来判断是否登录 
        get hasLogin(): string {
            return '11'
        }
        
        signup(params: string) {
           console.log(params)
        }
    }
    
    let login = new Login
    login.hasLogin       // 11
}




/**
 * set 属性
 */
{
    var language = {
        log: [],
        set current(name: string) {
            (this.log as any).push(name);
        }
    }

    language.current = 'EN';
    language.current = 'FA';

    console.log(language.log); // ["EN", "FA"]
}
{
    var languageTest = {
        log: new Array,
        set current(name: string) {
            this.log.push(name);
        }
    }

    languageTest.current = 'EN';
    languageTest.current = 'FA';

    console.log(languageTest.log); // ["EN", "FA"]
}



/**
 * 删除对象属性
 */
{
    let obj: Object = {name: '1',sex: '男'}
    delete (obj as any).name
}
// {
//     let obj: Object = {name: '1',sex: '男'}
//     let result: boolean = (Reflect as any).deleteProperty(obj,'name')
//     console.log(result)
// }





/**
 * defineProperty 在现有对象定义 getter 和 setter
 */
{
    var o = { a:0 }
    Object.defineProperty(o, "b", { 
        get: function () { 
            return this.a + 1; 
        } 
    });

    console.log((o as any).b) // 1
}
{
    var o = { a:0 };
    Object.defineProperty(o, "b", { 
        set: function (x) { 
            this.a = x / 2; 
        } 
    });

    (o as any).b = 10;
    console.log(o.a) // 5
}






/**
 * 参数校验
 */
function one(arg: any = checkFn()): void{
    console.log('传参了')
}
function checkFn(): void{
    throw new Error('没有传参')
}

one('1')