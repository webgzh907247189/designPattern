import { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(com: T) => {
    (com as SFCWithInstall<T>).install = (app) => {
        const {name} = com  as unknown as { name: string }

        // 把组件注册成为全局组件
        app.component(name, com)
    }

    return com as SFCWithInstall<T>
}
