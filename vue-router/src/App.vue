<template>
	<div>
		<div>about</div>
		<div>home</div>
		<router-link to='/about'>about</router-link>
		<router-link to='/home'>home</router-link>

		<div>
			<a @click="go('/home')">home页面</a>
			<a @click="go('/about')">about页面</a>
			<div id="content"></div>
		</div>
		<router-view>
		</router-view> <!--  一级路由，载体 -->
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted(){
			console.log(this.$router)  //方法
			console.log(this.$route) // 属性
		},
		methods: {
			go(pathName){
                // console.log('111',pathName)

                history.pushState({},null,pathName)
                content.innerHTML = pathName
            }
		},
		created(){
			window.addEventListener('popstate',()=>{
				console.log(location.pathname,'location.pathname')
				this.go(location.pathname)
			})
		}
	}
</script>

<style>
</style>