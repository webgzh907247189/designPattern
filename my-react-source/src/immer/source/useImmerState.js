import React, { useRef, useState } from 'react'
import { toProxy,INTERNAL } from './core'
import * as is from './is'

function useImmerState(baseState){
    // 根据 baseState 声明一个基本状态
    const [state, setState] = useState(baseState)
    const draftRef = useRef(toProxy(baseState, () => {
        // 自己发生改变， 对应的父亲也要改变，需要执行 父亲的回掉函数

        // 对应的 baseState 发生改变，执行后面的回掉函数
        
        // const internal = draftRef.current[INTERNAL]
        // const newState = internal.draftState
        // setState(() => {
        //     return is.isObject(newState) ? {...newState} : [...newState]
        // })

        const { draftState } = draftRef.current[INTERNAL]
        setState({...draftState})
    }))

    const updateDraft = (producer) => producer(draftRef.current)
    return [state, updateDraft]
}

export default useImmerState;