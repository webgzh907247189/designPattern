<template>
    <div>
        vite
        <HelloWord msg="vue3 + vite"/>
    </div>
</template>
<script setup>
// 使用 setup 之后， 把单文件组件中，把所有的顶级变量都绑定模板
import { defineComponent } from 'vue'
import HelloWord from '@/components/helloword.vue'
import './global.css';

defineComponent({
    components: {
       HelloWord
    }
})

fetch('/api/posts/1').then((res) => {
    return res.json();
}).then((res) => {
    console.log(res);
})
</script>
