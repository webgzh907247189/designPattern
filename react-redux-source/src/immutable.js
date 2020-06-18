// 每次都会返回一个新对象
// import {Map} from 'immutable'

let {Map,fromJS,is} = require('immutable')
let _ = require('lodash')


let obj1 = Map({name: 'test'})
let obj2 = obj1.set('name', '??')
console.log(obj2,obj1 === obj2)


// 多层带 In
let obj3 = fromJS({user: {age: 18}})
let obj4 = obj3.setIn(['user','age'],20)
console.log(obj3,obj4)

let obj5 = obj3.updateIn(['user','age'],x => x+ '!!!')
console.log(obj5)

let obj6 = obj3.mergeIn(['user'],{home: 'xxx'})
console.log(obj6)


// is针对react应用优化可以使用， 因为只看值
let obj7 = Map({name: '11'})
let obj8 = Map({name: '11'})
console.log(is(obj7,obj8),obj7 == obj8,_.isEqual(obj7,obj8)) // true fasle true



let list1 = fromJS([1,2,4])
let list2 = list1.push('zz')
console.log(list1,'==',list1.size,'===',list2) // [1,2,4] '==' 3 '===' [1,2,4,"zz"]

let list3 = list2.pop()
let list4 = list3.update(2,x=>x+'??')
console.log(list3,list4,list4.get(1),list4.includes('4??')) //[1,2,4]  [1,2,"4??"]  2  true









let obj9 = Map({name: '11'})
console.log(obj9.toJS(),obj9.toObject(),obj9.toJSON()) //{ name: '11' } { name: '11' } { name: '11' }