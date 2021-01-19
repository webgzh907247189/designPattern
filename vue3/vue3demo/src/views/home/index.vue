<template>
  <div class="home">
    11112 name -> {{name}}
    <Suspense>
      <template #default>
        <Children :name="name" @setName="setName" ref="childrenRef"/>
      </template>
      <template #fallback>
        loading...
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore, Store } from 'vuex';
import { GlobalState } from '../../store';
import Children from './children.vue';
import { SET_NAME } from '../../store/modules/home';

function useName(store: Store<GlobalState>){
  let name = computed(() => {
      return store.state.home.name;
  })

  function setName(newName: string){
    store.commit(`home/${SET_NAME}`, newName);
  }

  onMounted(() => {
    console.log('onMounted')
  })
  return {name, setName};
}

export default defineComponent({
  name: 'Home',
  components: {
    Children
  },
  setup(){
    let store = useStore<GlobalState>();

    let {name, setName} = useName(store);

    const childrenRef = ref<null | HTMLElement>(null)
    // childrenRef.value = ''
    console.log(childrenRef.value)

    return {
      name,
      setName
    }
  }
});
</script>

// pre-dev-1218-citest
// 2020122301-citest-stg
// test:weixin