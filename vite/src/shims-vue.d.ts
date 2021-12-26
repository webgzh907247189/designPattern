
// 声明 vue文件 类型
declare module '*.vue'{
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {} ,any>
    export default component
}