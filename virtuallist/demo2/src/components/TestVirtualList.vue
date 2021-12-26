<template>
  <div class="hello">
    <virtual-list style="height: 300px; overflow-y: auto;"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import ItemComponent from './Item'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    VirtualList,
    ItemComponent
  },
  data () {

    const itemsList = Array.from({length: 10000}, (item,idx) => {
      return {
        uid: 'unique_' + idx, text: 'idx'
      }
    })
    return {
      itemComponent: ItemComponent,
      items: itemsList,
    }
  },
}
</script>

<style scoped>
</style>
