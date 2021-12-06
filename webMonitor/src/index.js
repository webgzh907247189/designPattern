import './monitor/index';


import data from 'data: text/javascript,export default "title"'
console.log(data, 'data');

import { sum } from './program.wasm'
console.log(sum(1, 2), 'webAssembly')




// await import('./a.js')

// export default class Person {
//     constructor (name) {
//       this.className = 'Person'
//       this.name = name
//     }
//     getName () {
//       return this.name
//     }
//     sex(){
//         this.aa = '123213'
//     }
//   }
  
//   var a = new Person()
//   console.log(a.getName())