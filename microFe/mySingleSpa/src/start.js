import { reroute } from './navigations/reroute'

export let started = false;

// 挂载应用
export function start(){
    started = true;
    reroute() // 除了加载应用还需要去挂载应用
}