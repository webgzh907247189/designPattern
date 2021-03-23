<template>
    <div class="aa">Children1</div>
</template>

<script>
/**
 * data：递归合并，如有冲突，组件数据优先；
 * 钩子函数都会调用，组件自身钩子后执行；
 * 值为对象的选项，只会进行第一层合并，如有冲突，组件数据优先
 * css是根据选择器去合并和覆盖的；
 */
import dataExtends from './2';
export default {
    name: "Children1",
    extends: dataExtends,
    data() {
        return {
            aa: 'Children1 Render'
        };
    },
    beforeCreate() {
        console.log("==============Children1 beforeCreate start==================");
        console.log(this.aa);
    },
    created() {
        console.log("==============Children1 created start==================");
    },
    beforeMount() {
        console.log("==============Children1 beforeMount start==================");
    },
    mounted() {
        console.log("==============Children1 mounted start==================");
    },
    beforeUpdate() {
        console.log("==============Children1 beforeUpdate start==================");
    },
    updated() {
        console.log("==============Children1 updated start==================");
    },
    beforeDestroy() {
        console.log("==============Children1 beforeDestroy start==================");
    },
    destroyed() {
        console.log("==============Children1 destroyed start==================");
    }
}           
</script>
