const SyncHook = require('./SyncHook'); 
const AsyncParallelHook = require('./AsyncParallelHook');
const HookMap = require('./HookMap');

/**
 * webpack插件
 * https://juejin.cn/post/6844903713312604173
 * 
 * https://juejin.cn/post/6844904095774408711
 */

module.exports = {
    SyncHook,
    AsyncParallelHook,
    HookMap
}