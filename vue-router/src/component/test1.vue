<template>
	<div>
        <Test2 v-bind="$attrs" :cc="getCC" />
	</div>
</template>


<script>
	// import TestChild from './testChild';
    import Test2 from './test2'
	export default {
		name: 'test2',
		components: {
			// TestChild
            Test2
		},
        data(){
            return {
                cc: ''
            }
        },
		computed:{
			getCC(){
				return 'cc12'
			}
		}
	}
</script>

<style>
</style>