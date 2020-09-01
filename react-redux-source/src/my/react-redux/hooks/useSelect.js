import React, { useContext, useLayoutEffect, useLayoutEffect, useRef, useReducer } from "react";
import reactReduxContext from "../context";
import useStore from "./useStore";
import Subscription from "../util/util";
import useReduxContext from "./useReduxContext";

// 没有这个，不刷新 (假设只有 useDispatch, useStore)
export default function useSelect(selector){
    const { store, subscription} = useReduxContext();
    const selectedStore = useSelectorWithStore(selector, equaltyFn, store, subscription)
    return selectedStore
}

const equaltyFn = (a,b) => a === b;
function useSelectorWithStore(selector, equaltyFn, store, subscription){
    const [,forceUpdate] = useReducer(s=> s+1, 0)

    // 上一个选择器
    let lastSelector = useRef();

    // 仓库上一个状态
    let lastStoreState = useRef();

    // 上一个选中的状态
    let lastSelectedState = useRef();

    // 得到仓库的 分状态
    let storeState = store.getState();

    // 映射的状态
    let selectedState

    // 选择器变了，或者仓库状态变了，都要重新执行
    if(selector !== lastSelector.current || storeState !== lastStoreState.current){
        // 重新映射计算
        selectedState = selector(storeState);
    }else{
        // 总的仓库状态没变，映射函数也没变，直接使用上一个状态
        selectedState = lastSelectedState.current
    }

    // 状态变了，强行刷新组件
    // 记录本地的状态和映射函数
    useLayoutEffect(() => {
        lastSelectedState.current = selectedState
        lastStoreState.current = storeState
        lastSelector.current = selector
    })

    useLayoutEffect(() => {
        function checkForUpdate(){
            const newSelectState = lastSelector.current(store.getState())

            // 不需要更新
            if(equaltyFn(newSelectState, lastSelectedState.current)){
                return;
            }

            lastSelectedState.current = newSelectState
            forceUpdate()
        }
        checkForUpdate()
        subscription.subscripte(checkForUpdate)
        
    }, [equaltyFn, store]);
    return selectedState
}