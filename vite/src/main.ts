import { createApp }  from 'vue'
import App from './App.vue';

const app = createApp(App)
app.mount('#root');



/**
 * node ./node_modules/esbuild/install.js   安装一下 产生一个 esbuild.exe
 * 
 * 
 * 有以下需求
 * 1. 这些资源不会被源码引用(robots.txt)
 * 2. 这些资源必须保持原有文件名(没有经过hash)
 * 那么可以把这些资源放到指定的 pubilc 目录中， 在顶层目录的 public 的目录 可以直接访问
 * 
 * 任何以 module.css 结尾的话 都会被当作 cssmodule 处理
 */