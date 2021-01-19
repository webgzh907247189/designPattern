<template>
    <div class="nav-container">
        <div id="nav">
            <router-link to="/home">Home|</router-link> 
            <router-link to="/profile">profile|</router-link>
            <router-link to="/mime">mime|</router-link>
        </div>
        <div style="marginTop: 100px"></div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

// miniprogram-sm-crypto
// sa-sdk-miniprogram
// https://www.youtube.com/watch?v=_OuEw6-3OL4&ab_channel=%E8%92%99%E9%9D%A2%E8%B4%A2%E7%BB%8FMaskFinance

// 高度塌陷

.nav-container {
    position: relative;
    top: 0px;
    left: 0px;
    height: 100%;
    // overflow: hidden;
    // zoom: 1;
}
// .nav-container:after {
//     content:""; 
//     display: block; 
//     clear:both; 
// }

#nav {
    width: 100%;
    position: fixed;
    top: 0px;
    padding: 30px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color:azure;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
