var _a;
/**
 * https://www.bilibili.com/video/BV1EY411s7EY/
 *
 * https://www.wolai.com/aE1oVmBGkgqPhzQcwmRuJU?theme=light
 */
{
}
{
}
{
}
{
}
{
}
{
}
{
}
{
}
{
    //字面量类型 和 类型字面量 的区别
    // 字面量类型
    var aa_1 = 'handle-open-flag';
}
{
}
{
    function orderFn(schema) { return [{ schema: schema }]; }
    // i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
    var getName_1 = orderFn({
        home: {
            topBar: {
                title: '顶部标题',
                welcome: '欢迎登录'
            },
            bottomBar: {
                notes: 'XXX备案，归XXX所有',
            },
        },
        login: {
            username: '用户名',
            password: '密码'
        }
    });
    getName_1('home.bottomBar.notes');
    getName_1('home.topBar.welcome');
    getName_1('home.bottomBar.notes');
    // i18n('home.login.abc')              // error，不存在的属性
    // i18n('home.topBar')                 // error，没有到最后一个属性
}
{
    function createComponent(emits) { return [{ emits: emits }]; }
    // 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
    var Component_1 = createComponent({
        'handle-open': function (flag) { return true; },
        'preview-item': function (data) { return true; },
        'close-item': function (data) { return true; },
        'name': 'test'
    });
    // const aa: sss = {
    //     onGetName
    // }
    console.log(
    // onHandleOpen 的类型为 (flag: boolean) => void
    onHandleOpen, { val: val, console: console, : .log(val.valueOf()) }
    // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
    , 
    // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
    onPreviewItem = { val: val }, {
        const: (item = val.item, index = val.index, val),
        const: a,
        number: number,
        console: console,
        : .log(a, index.toFixed(2))
    });
}
// 所有的监听事件属性都是可选属性，可以不传处理函数句柄
onCloseItem = (_a = { val: val }, _a[{ val: val }] = , _a) /  >
;
// 提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
// 比如 Comp 可以接收属性 {name:string, age:number, flag:boolean, id?:string}，其中id为可选属性，那么可以这样写
var Comp = Function;
console.log(name, "", age = { 1:  }, flag /  > ); // 正确
console.log(name, "", age = { 1:  }, flag, id = "111" /  > ); // 正确
