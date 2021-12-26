<template>
	<div>
        {{sss}}---{{test2}}我是about -> vuex数据: {{this.$store.state.count}}
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
		{{name}}
	</div>
</template>

<script>
	export default {
		name: 'about',
		inject: ['name'],
		data() {
			console.log(this.$options.inject['name'])//inject[key].from;
			return {
				test1: 'test1',
				test2: 'test2',
			}
		},
		computed: {
			sss(){
				console.log('computed--test1')
				return this.test1
			}
		},
		watch: {
			test2(val, oldVal){
				console.log('watch--test2')
				console.log(val, oldVal)
			}
		},
		mounted(){
			// console.log(this.$store.state,'this.$store', 'mounted!!')
			setTimeout(() => {
				window.xx = this;
				this.test2 = 'test3'
			})

			this.name.sex.age.asd.asd.asda = '1'
		},
		created(){
			console.log('about--created')
			this.$on('hook:mounted', () => {
				// debugger
				console.log('mounted--自定义')
			})
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
		},
		destroy(){
			debugger
			console.log('about--destroy')
		}
	}
</script>

<style>
</style>