import module1 from './module1'
import module2 from './module2'
import jquery from 'jquery'

console.log(module1, module2, jquery)
import(/* webpackChunkName: "asyncModule1" */'./asyncModule1')