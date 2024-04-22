export let activeEffectScope = null

class EffectScope{
    active = true
    effects = []
    parent
    scopes // 收集作用域的
    constructor(detached = false){

        // 独立的才执行 effectScope 作用域收集
        if(!detached && activeEffectScope){
            // 处理 在 effectScope.run 里面 继续调用 effectScope.run 的行为
            (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this)
        }
    }
    run(fn){
        if(this.active){
            try{
                this.parent = activeEffectScope
                activeEffectScope = this
                return fn()
            }catch{
                activeEffectScope = this.parent
                this.parent = null
            }
        }
    }
    stop(){
        if(this.active){
            for (let index = 0; index < this.effects.length; index++) {
                const effect = this.effects[index];

                // 让每一个存贮的 effect 全部终止
                effect.stop()
            }

            // 让外层的 scope 也能控制里层的 scope
            if(this.scopes){
                for (let index = 0; index < this.scopes.length; index++) {
                    const scope = this.scopes[index];
                    scope.stop()
                }
            }

            this.active = false
        }
    }
}

export const effectScope = (detached) => {
    return new EffectScope(detached)
}

export const recordEffectScope = (effect) => {
    if(activeEffectScope && activeEffectScope.active){
        activeEffectScope.effects.push(effect)
    }
}