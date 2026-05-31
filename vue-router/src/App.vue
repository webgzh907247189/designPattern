<template>
	<div>
		<!-- <div data-test="11111" class="111">{{aaa}}</div> -->
		<div>{{aaa}}</div>
		<!-- <router-link to='/about'>about</router-link>
		<router-link to='/home'>home</router-link>
		<router-link to='/test/testChild'>test/testChild</router-link>
		<Test1 :aa="aa" :bb="bb" /> -->
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
import { aa } from './com'
	// import  TestExtend from './testTextend/1';
	// import Test1 from './component/test1.vue'
	export default {
		name: 'app',
		components: {
			// TestExtend,
			// Test1
		},
		data(){
			return {
				message: {name: '11'},
				aaa: 'aaazz',

				aa: 'aa1',
				bb: 'bb1'
			}
		},
		provide() {
			return {
				name: this.message
			}
		},
		mounted(){
			aa()
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
			// window.this11 = this;
			// setTimeout(() => {
			// 	this.message.name = 'gzh'
			// 	window.aa = this;
			// 	// this.message = {name: 'gzh'}
			// }, 5000)

			// setTimeout(() => {
				
			// 	this.message.name = 'gzh1111'
				
			// 	// this.message = {name: 'gzh'}
			// }, 10000)
			// window.addEventListener('popstate',()=>{
			// 	console.log(location.pathname,'location.pathname')
			// 	this.go(location.pathname)
			// })
		}
	}
</script>

<style>
</style>