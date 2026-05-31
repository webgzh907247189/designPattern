<template>
	<div>
        {{ aa }} -- {{ bb }} --{{ cc }}
	</div>
</template>


<script>
	export default {
		name: 'test2',
		// props: {
		// 	aa: {
        //         type: String,
        //         default: ''
        //     },
        //     bb: {
        //         type: String,
        //         default: ''
        //     },
        //     cc: {
        //         type: String,
        //         default: ''
        //     }
		// },
        mounted(){
            debugger
            console.log(this.$attrs, '???')
        }
	}
</script>

<style>
</style>