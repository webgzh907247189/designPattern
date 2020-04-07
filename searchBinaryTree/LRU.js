/**
 * LRU 算法
 * https://juejin.im/post/5e8b3085f265da47c15cb8bb
 * 
 * 在 keep-alive 缓存超过 max 时，使用的缓存淘汰算法就是 LRU 算法，
 * 它在实现的过程中用到了 cache 对象用于保存缓存的组件实例及 key 值，keys 数组用于保存缓存组件的 key ，
 * 当 keep-alive 中渲染一个需要缓存的实例时：
 * 判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 key 在 keys 中的位置（移除 keys 中 key ，并放入 keys 数组的最后一位）
 * 如果没有缓存，则缓存该实例，若 keys 的长度大于 max （缓存长度超过上限），则移除 keys[0] 缓存
 */

class LRUCache {
    constructor(options){
        this.max = options?.max ?? '3';
        this.keyMap = new Map([]);
    }

    get(key){
        const value = this.keyMap.get(key)

        if(!value){
            return -1
        }

        this.keyMap.delete(key);
        this.put(key,value);
        return value;
    }

    put(key,value){
        const mapSize = this.keyMap.size;
        if(mapSize >= this.max){
            const keys = [...this.keyMap.keys()];
            const deleteItemKey = keys[0];
            this.keyMap.delete(deleteItemKey);  
        }
        this.keyMap.set(key,value)
    }
}

const cache = new LRUCache({ max: 2 });
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
