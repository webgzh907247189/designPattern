// import { create } from 'zustand'
// import { immer } from 'zustand/middleware/immer'

import { create } from './zustand/index'
// import logger from './zustand/middlerare/logger'
// import { persist, createJSONStorge } from './zustand/middlerare/persist'
import { immer } from './zustand/middlerare/immer'


// 无 中间件 的版本
export default create((set, get, api) => {
    return {
        number: 0,
        asyncNumber: 0,
        name: 'zustand',
        add: () => {
            // console.log('add')
            set((state) => {
                // 更新的时候进行 数据合并
                console.log(state, '??')
                return { number: state.number + 1 }
            })
        },
        asyncAdd: () => {
            setTimeout(() => {
                set((state) => {
                    return { asyncNumber: state.asyncNumber + 1 }
                })
            }, 1000)
        }
    }
})

// 携带 logger 中间件的版本
// export default create(logger((set, get, api) => {
//     return {
//         number: 0,
//         asyncNumber: 0,
//         name: 'zustand',
//         add: () => {
//             // console.log('add')
//             set((state) => {
//                 // 更新的时候进行 数据合并
//                 console.log(state, '??')
//                 return { number: state.number + 1 }
//             })
//         },
//         asyncAdd: () => {
//             setTimeout(() => {
//                 set((state) => {
//                     return { asyncNumber: state.asyncNumber + 1 }
//                 })
//             }, 1000)
//         }
//     }
// }))

// 携带 persist 的版本
// export default create(persist((set, get, api) => {
//     return {
//         number: 0,
//         asyncNumber: 0,
//         name: 'zustand',
//         add: () => {
//             // console.log('add')
//             set((state) => {
//                 // 更新的时候进行 数据合并
//                 console.log(state, '??')
//                 return { number: state.number + 1 }
//             })
//         },
//         asyncAdd: () => {
//             setTimeout(() => {
//                 set((state) => {
//                     return { asyncNumber: state.asyncNumber + 1 }
//                 })
//             }, 1000)
//         }
//     }
// }, {
//     name: 'test',
//     storage: createJSONStorge(localStorage)
// }))


// 携带 immer 版本
// export default create(immer((set, get, api) => {
//     return {
//         number: 0,
//         asyncNumber: 0,
//         name: 'zustand',
//         add: () => {
//             // console.log('add')
//             // set((state) => {
//             //     // 更新的时候进行 数据合并
//             //     console.log(state, '??')
//             //     return { number: state.number + 1 }
//             // })


//             // 使用 immer 之后
//             set((state) => {
//                state.number += 1
//             })
//         },
//         asyncAdd: () => {
//             // setTimeout(() => {
//             //     set((state) => {
//             //         return { asyncNumber: state.asyncNumber + 1 }
//             //     })
//             // }, 1000)

//             // 使用 immer 之后
//             setTimeout(() => {
//                 set((state) => {
//                    state.asyncNumber += 1
//                 })
//             }, 1000)
//         }
//     }
// }))