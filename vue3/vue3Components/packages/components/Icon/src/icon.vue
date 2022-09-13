<template>
    <i :class="bem.b()" :style="style">
        <slot></slot>
    </i>
</template>

<!-- <script lang="ts">
export default {
    name: 'test111'
}
</script> -->

<script setup lang="ts">
import { iconProps } from './icon'
import { createNameSpace } from "@test/utils/create";
import { computed } from '@vue/reactivity';

defineOptions({
    name: 'test-icon'
})

const bem = createNameSpace('icon')

const props = defineProps(iconProps)

const style = computed(() => {
    if(!props.size && !props.color) return {}
    return {
        ...(props.color ? { color: props.color } : {}),
        ...(props.size ? { 'font-size': props.size + 'px'} : {}),
    }
})
</script>