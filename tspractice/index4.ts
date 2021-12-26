# 一、实现组件继承属性类型

- 实现类型 ComponentType<Option> 以及函数createComponent的类型定义（无需实现功能）
- 使得函数createComponent能够创建一个React组件，支持设置三个属性值：props属性，emits事件以及inherit继承组件，具体要求看使用代码；
- 先做的简单一点，组件所有属性都是可选属性(props,emits以及继承的属性都是可选的)。
- 提示：先完整看一遍题目再开始实现功能；

```tsx
function createComponent<Option extends ComponentOption>(option: Option): { (props: ComponentType<Option>): any } {return {} as any}

// 基于button标签封装的组件，覆盖title属性以及onClick事件类型
const Button = createComponent({
    inherit: "button",                              // 继承button标签所有属性以及事件
    props: {
        // 基础类型的属性
        label: String,
        width: Number,
        loading: Boolean,
        block: [Boolean, Number],                   // 联合属性类型：block: boolean|number
        title: Number,                              // 覆盖button的属性类型 title:string -> title:number
    },
    emits: {
        'show-change': (len: number) => {},         // 自定义的事件类型
        click: (name: string) => {},                // 覆盖button的click事件类型
    },
})

console.log(
    /*
    *  要求：
    *  1. 属性类型为 {label?:string, width?:number, loading?: boolean, block?:boolean|number, title?:number}
    *  2. 事件类型为：{onShowChange?:(len:number)=>void, onClick?:(name:string)=>void}
    *  3. 能够继承button的所有属性以及事件
    */
    <Button
        label={""}
        width={100}
        title={111}
        onShowChange={len => {
            console.log(len.toFixed(0))     // 不允许有隐式的any类型，这里即使没有定义len的类型，len也应该能够自动推断出来为number类型
        }}
        onClick={e => {
            console.log(e.charAt(0))
        }}
    />
)

// 基于Button组件封装的组件，覆盖label属性以及show-change，click事件类型
const ProButton = createComponent({
    inherit: Button,                                // 继承Button所有属性以及事件
    props: {
        // 基础类型数据推断
        proLabel: String,
        label: [String, Number],                    // 覆盖Button的label属性类型：label:string -> label:string|number
    },
    emits: {
        'show-change': (el: HTMLButtonElement) => {},// 覆盖的事件类型
        click: (el: HTMLButtonElement) => {},       // 覆盖的事件类型
        'make-pro': () => {},                       // 自定义事件类型
    },
})

console.log(
    /*
    *  要求：
    *  1. 属性类型为 {proLabel?:string, label?:string|number}
    *  2. 事件类型为：{onShowChange?:(el: HTMLButtonElement)=>void, onClick?:(el: HTMLButtonElement)=>void, onMakePro?:()=>void}
    *  3. 继承Button组件所有的属性以及事件
    */
    <ProButton
        label={111}
        onShowChange={e => {
            console.log(e.offsetWidth)                  // 不允许有隐式的any类型，这里即使没有定义len的类型，len也应该能够自动推断出来为number类型
        }}
        onClick={e => {
            console.log(e.offsetWidth)
        }}
        onMakePro={() => {}}
    />
)
```

**提示，如何得到button标签的属性类型**

- 在文件：node_modules/@types/react/index.d.ts 中寻找 JSX.IntrinsicElements
- 比如div标签的属性类型为 JSX.IntrinsicElements["div"]

```tsx
const MyDiv = (props: JSX.IntrinsicElements["div"]) => null
console.log(<>
    <div contentEditable={true} aria-label="div text"/>
    <MyDiv contentEditable={true} aria-label="div text"/>
</>)
```

# 二、(React)实现Hook函数useAsyncMethods

- React同学专属题目，Vue同学请看第三题；
- 使用hook函数以及hook组件实现，如果可以的话尽量不要使用class组件；
- useAsyncMethods函数是一个hook函数，接收两个参数：(methods:Record<string, SimpleMethod>,alone?:boolean)
- SimpleMethod类型 `interface SimpleMethod {(...args: any[]): any}`
- 返回值类型为一个对象，这个对象的类型与参数methods一致，不过会多出来一个属性 loading；loading是一个对象，对象的key类型为methods中的key，除此之外还多了一个key，叫做global，loading对象所有属性值类型都是布尔值；这些属性的作用如下所示：
    - 比如 `const methods = useAsyncMethods({fun1:(val:string)=>{},fun2:(val:number)=>{}})`
    - `methods.fun1` 与定义的时候的类型一致，只不过返回值一定是Promise的包装类型，不管原始的fun1是否为异步函数；
    - `methods.fun2` 也是一样，与定义的时候的类型一致；
    - `methods.loading.fun1` 可以用来判断 fun1是否执行完毕，同理 `methods.loading.fun2`也是；
    - `methods.loading.global` 任意一个函数没有执行完，这个值就是true，所有函数执行完毕之后，这个值就是false；
- 当`methods.fun1`没有执行完毕时，再次调用该函数无效，也就是在没有结束之前不会执行定义的时候的fun1函数；
- 当设置了alone参数为true的时候，只有当所有函数执行完毕之后才能执行下一个函数；也就是说，alone为false的时候，函数执行只跟自己是互斥的，fun1执行完之后才能再次执行fun1； 与fun2无关；当设置了alone为true的时候，所有函数都是互斥的，fun1执行完之后才能执行fun1，fun2；

## 示例效果页面

- http://martsforever-demo.gitee.io/template-plain-react-micro-base/
- 子应用 -> React子应用 -> 测试 createAsyncMethods 按钮
- 目前有四个按钮，每个按钮对应一个异步函数执行；
- 每个异步函数都会有一个state，是个数字类型的count，异步函数执行完之后count会加一；

## 用来测试的示例代码

```tsx
import React, {useState} from "react";
import {randomDelay, useAsyncMethods} from "@/pages/message/useAsyncMethods";
import {Button, Spin} from "antd";

const Demo1 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods({
        method1: async (id: string) => {
            console.log('任务一开始')
            await randomDelay(1000, 3000)
            console.log('任务一结束')
            setMethod1(val => val + 1)
        },
        method2: async (start: number, end: number) => {
            console.log('任务二开始')
            await randomDelay(1000, 2000)
            console.log('任务二结束')
            setMethod2(val => val + 1)
            return start + end
        },
        method3: async (result: any) => {
            console.log('任务三开始', {result})
            await randomDelay(2000, 3000)
            console.log('任务三结束')
            setMethod3(val => val + 1)
        },
        togetherMethod2and3: async () => {
            console.log('任务四开始')
            // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
            const ret = await methods.method2(2, 3)
            // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
            await methods.method3(ret.toFixed(2))
            console.log('任务四结束')
            setTogetherMethod2and3(val => val + 1)
        },
    })

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h1>测试createAsyncMethods</h1>
            <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}


const Demo2 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods((() => {
        const m = {
            method1: async (id: string) => {
                console.log('任务一开始')
                await randomDelay(1000, 3000)
                console.log('任务一结束')
                setMethod1(val => val + 1)
            },
            method2: async (start: number, end: number) => {
                console.log('任务二开始')
                await randomDelay(1000, 2000)
                console.log('任务二结束')
                setMethod2(val => val + 1)
                return start + end
            },
            method3: async (result: any) => {
                console.log('任务三开始', {result})
                await randomDelay(2000, 3000)
                console.log('任务三结束')
                setMethod3(val => val + 1)
            },
            togetherMethod2and3: async () => {
                console.log('任务四开始')
                // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
                const ret = await m.method2(2, 3)
                // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
                await m.method3(ret.toFixed(2))
                console.log('任务四结束')
                setTogetherMethod2and3(val => val + 1)
            },
        }
        return m
    })(), true)

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}

export default () => {

    return <>
        <Demo1/>
        <Demo2/>
    </>
}
```

## 问题

Demo2中的useAsyncMethods为什么要这样创建；

# 三、(Vue3.0)实现Composition函数createAsyncMethods

- Vue3.0同学专属题目，React同学请看第二题
- 使用reactive api实现
- createAsyncMethods函数是一个普通函数，接收两个参数：(methods:Record<string, SimpleMethod>,alone?:boolean)
- SimpleMethod类型 `interface SimpleMethod {(...args: any[]): any}`
- 返回值类型为一个对象，这个对象的类型与参数methods一致，不过会多出来一个属性 loading；loading是一个对象，对象的key类型为methods中的key，除此之外还多了一个key，叫做global，loading对象所有属性值类型都是布尔值；这些属性的作用如下所示：
  - 比如 `const methods = createAsyncMethods({fun1:(val:string)=>{},fun2:(val:number)=>{}})`
  - `methods.fun1` 与定义的时候的类型一致，只不过返回值一定是Promise的包装类型，不管原始的fun1是否为异步函数；
  - `methods.fun2` 也是一样，与定义的时候的类型一致；
  - `methods.loading.fun1` 可以用来判断 fun1是否执行完毕，同理 `methods.loading.fun2`也是；
  - `methods.loading.global` 任意一个函数没有执行完，这个值就是true，所有函数执行完毕之后，这个值就是false；
- 当`methods.fun1`没有执行完毕时，再次调用该函数无效，也就是在没有结束之前不会执行定义的时候的fun1函数；
- 当设置了alone参数为true的时候，只有当所有函数执行完毕之后才能执行下一个函数；也就是说，alone为false的时候，函数执行只跟自己是互斥的，fun1执行完之后才能再次执行fun1； 与fun2无关；当设置了alone为true的时候，所有函数都是互斥的，fun1执行完之后才能执行fun1，fun2；

## 示例效果页面

- http://martsforever-demo.gitee.io/template-plain-react-micro-base
- 子应用 -> Vue子应用 -> 测试 createAsyncMethods 按钮
- 目前有四个按钮，每个按钮对应一个异步函数执行；
- 每个异步函数都会有一个state，是个数字类型的count，异步函数执行完之后count会加一；

## 用来测试的示例代码

```html
<template>
  <div style="background-color: white;padding: 20px 10px">
    <h1>测试createAsyncMethods</h1>
    <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
    <el-button @click="methods.method1">
      <span>一号异步任务({{ state.method1 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method1">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.method2">
      <span>二号异步任务({{ state.method2 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method2">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.method3">
      <span>三号异步任务({{ state.method3 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method3">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.togetherMethod2and3">
      <span>四号异步任务({{ state.togetherMethod2and3 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.togetherMethod2and3">
        <Loading/>
      </el-icon>
    </el-button>

    <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
    <el-button @click="methods2.method1">
      <span>一号异步任务({{ state2.method1 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method1">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.method2">
      <span>二号异步任务({{ state2.method2 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method2">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.method3">
      <span>三号异步任务({{ state2.method3 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method3">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.togetherMethod2and3">
      <span>四号异步任务({{ state2.togetherMethod2and3 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.togetherMethod2and3">
        <Loading/>
      </el-icon>
    </el-button>

  </div>
</template>

<script lang="ts">

import {createAsyncMethods, randomDelay} from "@/pages/message/createAsyncMethods";
import {Loading} from '@element-plus/icons'
import {defineComponent, reactive} from 'vue'

export default defineComponent({
  components: {Loading},
  setup() {
    const state = reactive({
      method1: 0,
      method2: 0,
      method3: 0,
      togetherMethod2and3: 0,
    })
    const methods = createAsyncMethods({
      method1: async (id: string) => {
        console.log('任务一开始')
        await randomDelay(1000, 3000)
        console.log('任务一结束')
        state.method1++
      },
      method2: async (start: number, end: number) => {
        console.log('任务二开始')
        await randomDelay(1000, 2000)
        console.log('任务二结束')
        state.method2++
        return start + end
      },
      method3: async (result: any) => {
        console.log('任务三开始', {result})
        await randomDelay(2000, 3000)
        console.log('任务三结束')
        state.method3++
      },
      togetherMethod2and3: async () => {
        console.log('任务四开始')
        // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
        const ret = await methods.method2(2, 3)
        // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
        await methods.method3(ret.toFixed(2))
        console.log('任务四结束')
        state.togetherMethod2and3++
      },
    })

    const state2 = reactive({
      method1: 0,
      method2: 0,
      method3: 0,
      togetherMethod2and3: 0,
    })
    const methods2 = createAsyncMethods((() => {
      const m = {
        method1: async (id: string) => {
          console.log('任务一开始')
          await randomDelay(1000, 3000)
          console.log('任务一结束')
          state2.method1++
        },
        method2: async (start: number, end: number) => {
          console.log('任务二开始')
          await randomDelay(1000, 2000)
          console.log('任务二结束')
          state2.method2++
          return start + end
        },
        method3: async (result: any) => {
          console.log('任务三开始', {result})
          await randomDelay(2000, 3000)
          console.log('任务三结束')
          state2.method3++
        },
        togetherMethod2and3: async () => {
          console.log('任务四开始')
          const ret = await m.method2(2, 3)
          await m.method3(ret.toFixed(2))
          console.log('任务四结束')
          state2.togetherMethod2and3++
        },
      }
      return m
    })(), true)

    return {
      state,
      methods,
      state2,
      methods2,
    }
  },
})

</script>
```

## 问题

methods2中的createAsyncMethods为什么要这样创建；
