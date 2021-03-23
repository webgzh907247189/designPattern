<template>
    <div>
        1223213
    </div>
</template>

<script>
export default {
    data() {
        return {
            aa: 'Base'
        }
    },
    render() {
        return this.aa
    },
    beforeCreate() {
        console.log("==============Base beforeCreate start==================");
    },
    created() {
        console.log("==============Base created start==================");
        console.log(this.aa);
    },
    beforeMount() {
        console.log("==============Base beforeMount start==================");
    },
    mounted() {
        console.log("==============Base mounted start==================");
    },
    beforeUpdate() {
        console.log("==============Base beforeUpdate start==================");
    },
    updated() {
        console.log("==============Base updated start==================");
    },
    beforeDestroy() {
        console.log("==============Base beforeDestroy start==================");
    },
    destroyed() {
        console.log("==============Base destroyed start==================");
    }
}
</script>
