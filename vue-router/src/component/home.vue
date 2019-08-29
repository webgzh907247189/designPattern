<template>
	<div>
        我是home -> vuex的数据 {{this.$store.state.count}}
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				
			}
		},
		asyncDate(store){
			// 返回到是一个promise
			return store.dispatch('action')
		},
		mounted(){
			this.$store.dispatch('action')
		}
	}
</script>

<style>
</style>