// https://juejin.im/post/5d7efbbb6fb9a06b2650c74a

const babel = require('@babel/core');
let s = require('@babel/polyfill')

const code = `[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
const ast1 = babel.transform(code, {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 2
      }
    ]
  ]
});

// 用core-js@2 来看看转码后的结果
console.log(ast1.code);

// "use strict";
// [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);


const ast2 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ]
});
// 用core-js@3 来看看转码后的结果
console.log(ast2.code);

// "use strict";
// require("core-js/modules/es.array.flat");
// require("core-js/modules/es.array.unscopables.flat");
// [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);




const ast3 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 2
        }
      ]
    ]
});
console.log(ast3.code)
// "use strict";
// [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);



const ast4 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3
        }
      ]
    ]
});
console.log(ast4.code)

// "use strict";
// [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);



{
  const arrays = [[10], 50, [100, [2000, 3000, [40000]]]];

  function getList(list){
      return list.reduce((result, item) => {
          const i = Array.isArray(item) ? getList(item) : item
          result = result.concat(i)
          return result
      }, [])
  }
  console.log(getList(arrays))
  // [ 10, 50, 100, 2000, 3000, 40000 ]
}