// https://juejin.im/post/5df0cef76fb9a0165936e06a
function createSelect(selector,reduce){
    let lastState
    let lastResult
    return function(state){
        let newState = selector(state)
        //缓存上一次结果
        if(lastState !== newState){
            lastResult = reduce(newState)
            lastState = newState
        }
        return lastResult
    }
}

export default createSelect


{
    // 实现一个 once 函数，记忆返回结果只执行一次
    const f = () => {console.log('call'); return 3;}

    function once(fn){
        let result;
        let flag = false;
        return (...args) => {
            if(flag){
                return result;
            }
            flag = true;
            result = f(...args)
            return result;
        }
    }
    const r1 = once(f);
    console.log(r1(), 'r11')
    console.log(r1(), 'r12')
}

{
//     function defaultEqualityCheck(a, b) {
//         return a === b
//     }
      
//     function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
//         if (prev === null || next === null || prev.length !== next.length) {
//           return false
//         }
      
//         // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
//         const length = prev.length
//         for (let i = 0; i < length; i++) {
//           if (!equalityCheck(prev[i], next[i])) {
//             return false
//           }
//         }
      
//         return true
//     }
      
//     function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
//         let lastArgs = null
//         let lastResult = null
//         // we reference arguments instead of spreading them for performance reasons
//         return function () {
//           if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
//             // apply arguments instead of spreading for performance.
//             lastResult = func.apply(null, arguments)
//           }
      
//           lastArgs = arguments
//           return lastResult
//         }
//     }
      
//     function getDependencies(funcs) {
//         const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs
      
//         if (!dependencies.every(dep => typeof dep === 'function')) {
//           const dependencyTypes = dependencies.map(
//             dep => typeof dep
//           ).join(', ')
//           throw new Error(
//             'Selector creators expect all input-selectors to be functions, ' +
//             `instead received the following types: [${dependencyTypes}]`
//           )
//         }
      
//         return dependencies
//     }
      
//     function createSelectorCreator(memoize, ...memoizeOptions) {
//         return (...funcs) => {
//           let recomputations = 0
//           const resultFunc = funcs.pop()
//           const dependencies = getDependencies(funcs)
      
//           const memoizedResultFunc = memoize(
//             function () {
//               recomputations++
//               // apply arguments instead of spreading for performance.
//               return resultFunc.apply(null, arguments)
//             },
//             ...memoizeOptions
//           )
      
//           // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
//           const selector = memoize(function () {
//             const params = []
//             const length = dependencies.length
      
//             for (let i = 0; i < length; i++) {
//               // apply arguments instead of spreading and mutate a local list of params for performance.
//               params.push(dependencies[i].apply(null, arguments))
//             }
      
//             // apply arguments instead of spreading for performance.
//             return memoizedResultFunc.apply(null, params)
//           })
      
//           selector.resultFunc = resultFunc
//           selector.dependencies = dependencies
//           selector.recomputations = () => recomputations
//           selector.resetRecomputations = () => recomputations = 0
//           return selector
//         }
//     }
      
//     const createSelector = /* #__PURE__ */ createSelectorCreator(defaultMemoize)
      
//     function createStructuredSelector(selectors, selectorCreator = createSelector) {
//         if (typeof selectors !== 'object') {
//           throw new Error(
//             'createStructuredSelector expects first argument to be an object ' +
//             `where each property is a selector, instead received a ${typeof selectors}`
//           )
//         }
//         const objectKeys = Object.keys(selectors)
//         return selectorCreator(
//           objectKeys.map(key => selectors[key]),
//           (...values) => {
//             return values.reduce((composition, value, index) => {
//               composition[objectKeys[index]] = value
//               return composition
//             }, {})
//           }
//         )
//     }
}