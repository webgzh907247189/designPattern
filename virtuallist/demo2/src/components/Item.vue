<template>
  <div class="item">{{ index }} - {{ source.text }}</div>
</template>

<script>
  export default {
    name: 'item-component',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
.item {
  height: 30px;
}
</style>