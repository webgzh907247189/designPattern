import _Icon from './src/icon.vue'
export * from './src/icon'

import { withInstall } from '@test/utils/with-install'

const Icon = withInstall(_Icon)
export default Icon; // 可以通过 app.use 来使用， 也可以通过 import 的方式单独使用


declare module 'vue'{
    export interface GlobalComponents{
       TestIcon : typeof Icon
    }
}