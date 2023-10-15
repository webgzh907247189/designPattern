
const HookMap = require('./HookMap')
const SyncHook = require('./SyncHook')

// 参数是一个 映射函数  把一个 key 映射为 一个 hook
const keyedHook = new HookMap(key => new SyncHook(['name']))

// tap key 插件名字
keyedHook.tap('key', 'plugin1', (name) => { console.log(1, name) })

keyedHook.for('key').tap('plugin2', (name) => { console.log(1, name) })

const hook = keyedHook.get('key')
hook.call('chifan')