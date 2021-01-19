<template>
    <div>
        <div class="profile">3333</div>
        <div id="container" ref="refreshEle">
          <div v-for="(item,idx) in list" :key="idx" class="item">
            {{item.name}}
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { GlobalState } from "../../store";
import { GET_LIST } from '../../store/modules/home';
import { loadMore } from '../../hook/index';

export default defineComponent({
    name: "profile",
    components: {},
    setup(){
      let store = useStore<GlobalState>();
      const list = computed(() => {
        return store.state.home.listProfile
      })

      const refreshEle = ref<null | HTMLElement>(null);
      loadMore(refreshEle, store, `home/${GET_LIST}`);
      return {
        list,
        refreshEle
      }
    }
});
</script>

<style scoped>
#container {
  height: 400px;
  overflow: scroll;
  position: absolute;
  top: 100px;
  left: 0px;
  width: 100%;
}

.item {
  height: 80px;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 80px;
}
</style>