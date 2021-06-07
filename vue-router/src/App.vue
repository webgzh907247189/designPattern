<template>
	<div>
		<div>about</div>
		<div>home</div>
		<router-link to='/about'>about</router-link>
		<router-link to='/home'>home</router-link>
		<router-link to='/test/testChild'>test/testChild</router-link>

		<!-- <div>
			<a @click="go('/home')">home页面</a>
			<a @click="go('/about')">about页面</a>
			<div id="content"></div>
		</div> -->
		<router-view></router-view> 
		<!-- <TestExtend/> -->
        <!--  一级路由，载体 -->
	</div>
</template>

<script>
	import  TestExtend from './testTextend/1';
	export default {
		name: 'app',
		components: {
			TestExtend
		},
		data(){
			return {
				message: {name: '11'},
				aaa: 'aaa'
			}
		},
		provide() {
			return {
				name: this.message
			}
		},
		mounted(){
			// console.log(this.$router)  //方法
			// console.log(this.$route) // 属性
		},
		methods: {
			go(pathName){
                // console.log('111',pathName)

                history.pushState({},null,pathName)
                content.innerHTML = pathName
            }
		},
		created(){
			// console.log(this.$router)
			window.this11 = this;
			setTimeout(() => {
				this.message.name = 'gzh'
				window.aa = this;
				// this.message = {name: 'gzh'}
			}, 5000)
			// window.addEventListener('popstate',()=>{
			// 	console.log(location.pathname,'location.pathname')
			// 	this.go(location.pathname)
			// })
		}
	}
</script>

<style>
</style>