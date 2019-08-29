<template>
	<!-- ssr 客户端激活 -->
	<div id="root">
		<div @click="click" :class="$style.red">about 这是主页</div>
		<router-link to='/home'>home</router-link>
		<router-view></router-view> 
	</div>
</template>

<script>
	import Home from '../../src/component/home'
	export default {
		name: 'app',
		methods: {
			click(){
				console.log('click')
            }
		},
		created(){
		}
	}
</script>

<style module>
.red{
	background: red;
}
</style>