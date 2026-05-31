import { h } from './h'

export function Transition(props, { slots }) {
    return h(BaseTransition, resoleveTransitionProps(props), slots)
}

const resoleveTransitionHooks = (props) => {
    const { onBeforeEnter, onEnter, onLeave } = props

    return {
        beforeEnter(el){
            onBeforeEnter(el)
        },
        enter(el, done){
            onEnter(el, done)
        },
        leave(el, done){
            onLeave(el, done)
        }
    }
}

const BaseTransition = {
    // 兼容了 initProps 特意这样改
    props: {"onBeforeEnter": Function, "onEnter": Function, "onLeave": Function },
    setup(props, { slots }){
        return () => {
            const innerChild = slots.default && slots.default()

            const enterHooks = resoleveTransitionHooks(props)

            innerChild.transition = enterHooks

            return innerChild
        }
    }
}

const resoleveTransitionProps = (props) => {
    const { name = 'v', 
        enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`,  
        leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to`,  

        onBeforeEnter, onEnter, onLeave
    } = props


    return {
        onBeforeEnter(el){
            onBeforeEnter && onBeforeEnter(el)

            el.classList.add(enterFromClass)
            el.classList.add(enterActiveClass)
        }, 
        onEnter(el, done){
            const resolve = () => {
                el.classList.remove(enterActiveClass)
                el.classList.remove(enterToClass)

                done && done()
            }

            nextFrame(() => {
                el.classList.remove(enterFromClass)
                el.classList.add(enterToClass)

                // 没有传递 done 方法
                if(!onEnter || onEnter.length <= 1){
                    el.addEventListener("transitionend", resolve)
                }
            })

            onEnter && onEnter(el, resolve)
        }, 
        onLeave(el, done){

            const resolve = () => {
                el.classList.remove(leaveToClass)
                el.classList.remove(leaveActiveClass)

                done && done()
            }

            el.classList.add(leaveFromClass)
            document.body.offsetWidth
            el.classList.add(leaveActiveClass)

            nextFrame(() => {
                el.classList.remove(leaveFromClass)
                el.classList.add(leaveToClass)

                // 没有传递 done 方法
                if(!onEnter || onEnter.length <= 1){
                    el.addEventListener("transitionend", resolve)
                }
            })

            onLeave && onLeave(el, done)
        }
    }
}

// 确保动画在下一帧执行
const nextFrame = (cb) => {
    requestAnimationFrame(() => {
        requestAnimationFrame(cb)
    })
}