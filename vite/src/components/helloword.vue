<template>
    <div>
        <div class="text1">{{props.msg}}</div>
        <div :class="$style.text2">{{props.msg}}</div>
        <div :class="style.text3">{{props.msg}}</div>
        <div class="text3">{{props.msg}}</div>
        <button @click="handleClick">{{state.count}}</button>
    </div>
</template>
<script setup lang="ts">
// 使用 setup 之后， 把单文件组件中，把所有的顶级变量都绑定模板
import { defineProps, reactive } from 'vue'
import * as style from './hello.module.css';
console.log(style);

type State = { count: number }
const state = reactive<State>({ count: 0 })
const props = defineProps({
  msg: String,
})

const handleClick = () => {
    state.count++
}
</script>
<style scoped>
.text1 {
  color: #000;
}
</style>

<style module>
.text2 {
  color: yellow;
}
</style>

<style scoped lang="less">
@color: red;
.text3 {
  color: @color;
  transform: rotate(90deg);
}
</style>