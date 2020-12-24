<template>
  <div class="home">
    children
    name -> {{name}}
    list -> {{list}}
    <button @click="setChildrenName('发生了改变')">点击1</button>
    <button @click="storeSetName">点击2</button>
    {{list}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRef, toRefs } from 'vue';
import { useStore, Store } from 'vuex';
import store from '../../store';
import { ACTION_SET_NAME } from '../../store/modules/home';

export default defineComponent({
  name: 'Children',
  props: {
    name: {
      type: String as PropType<string>,
      default: '0'
    }
  },
  // 为了提示
  emits: ['setName'],
  components: {
  },
  async setup(props, context){
    // reactive 把 普通属性修改为 proxy
    // toRefs 用的 defineProperty
    // ref 处理简单数据 响应式      多个数据用 reactive
    let state = reactive({
      list: ['111', '222', '222']
    })


    const list = computed(() => {
      return store.state.home.list
    })
    console.log(list, list.value)

    function setChildrenName(name: string){
      context.emit('setName', name)
    }

    function storeSetName(){
      store.dispatch(`home/${ACTION_SET_NAME}`, '1111')
    }

    await new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve('')
      }, 3000);
    })
    return {
      name: props.name,
      ...toRefs(state),
      setChildrenName,
      storeSetName,
      list
    }
  }
});
</script>