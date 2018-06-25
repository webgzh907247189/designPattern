/**
 * https://juejin.im/post/5b222c6e51882574cd52fc68
 * 
 * JS实现监控微信小程序
 * 小程序的运行环境并没有window和document对象，它只暴露了一个wx全局对象，发送网络请求则是通过wx.request这个api，因此，这次我们需要拦截的就是wx.request方法
 */


var o = {};
Object.defineProperty(o,"sex",{
	configurable:false,
  	enumerable: true,
  	get: function(){
		console.log('get')
  	},
  	set: function(){
		throw new Error('出错了')	
 	}
});

console.log(o.sex) // get

o.sex = '123213'  //报错


const des = Object.getOwnPropertyDescriptor(o, 'sex');
//{get: ƒ, set: ƒ, enumerable: true, configurable: false}







小程序的运行环境并没有window和document对象，它只暴露了一个wx全局对象，发送网络请求则是通过wx.request这个api，因此，这次我们需要拦截的就是wx.request方法

wx.request = function() {
	console.log('66666');
}

这时控制台会报错TypeError: Cannot set property request of #<Object> which has only a getter
这是因为，wx.request这个属性，只有get方法而没有set方法，我们可以通过Object.getOwnPropertyDescriptor验证：

const des = Object.getOwnPropertyDescriptor(wx, 'request');

//  des {
//   configurable: true,
//   enumerable: true,
//   get: f(),
//   set: undefined
// }




/**
 * 实现拦截功能了
 */
var o = {name: '11', sex: function(url){ console.log('我是o.sex',url) }}
var originFun = o.sex;
Object.defineProperty(o,'sex',{
	configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
        const config = arguments || {};
        console.log('发送了ajax，config是: ', config[0]);

        return originFun.apply(this, arguments);
    }
})
o.sex('www.aaaaa.com')

// 发送了ajax，config是:  www.aaaaa.com
// 我是o.sex www.aaaaa.com












/**
 * 上报数据
 *
 * 收集好需要的数据后，当然就要上报后台。怎么上报？当然还是用的wx.request发送请求。
 * 这里就容易出现一个死循环: 如果用之前被我们包装过的wx.request上报数据，那么上报数据这个ajax请求，也会被我们认为是普通的ajax请求，然后又会触发上报，
 * 这样来来回回，无穷无尽的发送上报数据。
 *   
 */

var o = {name: '11', sex: function(url){ console.log('我是o.sex',url) }}
var originFun = o.sex;
Object.defineProperty(o,'sex',{
	configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
        const config = arguments || {};
        console.log('发送了ajax，config是: ', config[0]);
		

		if (config[0].indexOf('http://monitor.com') > -1) {
            // 直接发送请求，不上报
            return originFun.apply(this, arguments);
        }


		console.log('上报ajax数据啦!');
        o.sex('http://monitor.com/monitor/ajax')

        return originFun.apply(this, arguments);
    }
})
o.sex('www.aaaaa.com')

// 发送了ajax，config是:  www.aaaaa.com
// 上报ajax数据啦!
// 发送了ajax，config是:  http://monitor.com/monitor/ajax
// 我是o.sex http://monitor.com/monitor/ajax
// 我是o.sex www.aaaaa.com




var o = {name: '11', sex: function(url){ console.log('我是o.sex',url) }}
var originFun1 = o.sex;

function des(ss){
	var originFun = o.sex;
    Object.defineProperty(o,'sex',{
        configurable: true,
        enumerable: true,
        writable: true,
        value: function() {
            const config = arguments || {};
            console.log('发送了ajax，config是: ', config[0]);

            console.log('上报ajax数据啦!');
            originFun1('http://monitor.com/monitor/ajax')

            return originFun.apply(this, arguments);
        }
    })

	o.sex(ss)
}
des('111')

// 发送了ajax，config是:  111
// 上报ajax数据啦!
// 我是o.sex http://monitor.com/monitor/ajax
// 我是o.sex 111










/**
 * 占位符 替换
 * @type {String}
 */
var desText = '123213'
var desTitle = '/lessons/{0}'.replace('{0}', desText)
console.log(desText,desTitle) 
//123213 /lessons/123213

