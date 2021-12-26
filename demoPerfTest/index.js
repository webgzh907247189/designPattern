/**
 * https://segmentfault.com/a/1190000003486676
 * 
 * Ops/sec 测试结果以每秒钟执行测试代码的次数（Ops/sec）显示，这个数值越大越好
 * 
 * jsPerf也是基于Benchmark来运行的
 * 
 * 结论：没有经过编译之前 
 * class extends 性能由于 Object.setPrototypeOf
 * extends x 330,876 ops/sec ±2.48% (75 runs sampled)
 * setPrototypeOf x 255,603 ops/sec ±0.68% (81 runs sampled)
 * 
 * 
 * 编译之后 Object.setPrototypeOf 性能更优
 * extends x 138,236 ops/sec ±2.98% (80 runs sampled)
 * setPrototypeOf x 287,693 ops/sec ±2.84% (76 runs sampled)
 */


const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

suite.add('extends', function() {
    class A{
      eat(){
        console.log('吃饭')
      }
    }
  
    class B extends A{
      sleep(){
        console.log('睡觉--extends')
      }
    }
  })
  .add('setPrototypeOf', function() {
    class A{
      eat(){
        console.log('吃饭')
      }
    }

    class B {
      sleep(){
        console.log('睡觉--setProperOf')
      }
    }

    Object.setPrototypeOf(B.prototype, A.prototype)
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });









// const Benchmark = require('benchmark');

// const suite = new Benchmark.Suite;

// suite.add('awaitWrapFn', function() {
//     function awaitWrapFn(promiseFn) {
//       return (...args) => {
//           return promiseFn(...args)
//           .then(data => [null, data])
//           .catch(err => [err, null])
//       }
//     }
//     awaitWrapFn((ddd) => {
//       return Promise.resolve(ddd)
//     })('2222')

//   })
//   .add('compose', function() {
//     function awaitWrap(promise) {
//       return promise
//         .then(data => [null, data])
//         .catch(err => [err, null])
//     } 

//     function compose(...fns) {
//       return fns.reduce((a, b) => {
//           return (...args) => {
//               return a(b(...args));
//           }
//       })
//     }
  
//     const testFn = (ddd) => {
//       return Promise.resolve(ddd)
//     }
//     compose(awaitWrap, testFn)('222');

//   })
//   .add('awaitWrap', function() {
//     function awaitWrap(promise) {
//       return promise
//         .then(data => [null, data])
//         .catch(err => [err, null])
//     } 

//     const testFn = (ddd) => {
//       return Promise.resolve(ddd)
//     }
//     awaitWrap(testFn('222'));

//   })

//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ 'async': true });