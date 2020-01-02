//https://segmentfault.com/a/1190000013088373
const { fromJS } = require('immutable');
// import { fromJS } from 'immutable';

const data = {
  val: 1,
  desc: {
    text: 'a',
  },
  content: {
    time: '2018-02-01',
    val: 'Hello World',
  },
};

// 每次改过都会返回一个新的对象
const a = fromJS(data)
const b = a.set('val', 2)
console.log(a.get('val')) // 1
console.log(b.get('val')) // 2


const pathToText = ['desc', 'text']
const c = a.setIn([...pathToText], 'c')
console.log(a.getIn([...pathToText])) // 'a'
console.log(c.getIn([...pathToText])) // 'c'


console.log(b.get('desc') === a.get('desc'),c.get('desc') === a.get('desc'))       //true false
console.log(b.get('content') === a.get('content')) // true


// 变为js之后，肯定不相等
const e = a.toJS()
const f = b.toJS()
console.log(e.desc === f.desc)       // false
console.log(e.content === f.content) // false


/**
 * 深层次的对象在没有修改的情况下仍然能够保证严格相等。
 * 这里的严格相等就可以认为是没有新建这个对象，仍然在内部保持着之前的引用，但是修改却不会同步的修改。
 */