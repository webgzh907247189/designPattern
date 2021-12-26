<template>
    <div class="mime">mime{{state}}--{{name}}--{{sex}}--{{test}}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";

// 触底加载???
export default defineComponent({
    name: "mime",
    components: {},
    setup(props, content) {
      const state = reactive({
        name: '111',
        sex: '男'
      })

      let idRef = ref(0);

      setTimeout(() => {
        idRef.value++ //= ++idRef.value
        state.name = 'zzz'
      }, 2000)
      
      console.log(idRef, 'idRef')

      watch(idRef, (newVal, oldVal) => {
        console.log("新值:", newVal, "老值:", oldVal);
      });

      return {
        ...toRefs(state),
        test: idRef
      }
    },
});
</script>
<style scoped>
.mime {
    height: 100%;
}
</style>
