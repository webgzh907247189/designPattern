<template>
	<div>
        我是about -> vuex数据: {{this.$store.state.count}}
		<div>vuex 模块a的数据: {{this.$store.state.a}}</div>
		<button @click="btn">按钮改变state</button>

		<div>
			getters  改变数据 -> {{this.$store.getters.getCount}}
		</div>

		<div>
			<button @click="mutation">mutation 改变数据</button>
		</div>

		<div>
			<button @click="action">action 改变数据</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {
				
			}
		},
		mounted(){
			console.log(this.$store.state,'this.$store')
		},
		methods: {
			btn(){
				this.$store.state.count = 200
			},
			mutation(){
				this.$store.commit('change')
			},
			action(){
				this.$store.dispatch('action')
			}
		}
	}
</script>

<style>
</style>