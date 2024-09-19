import { useContext } from "react";
import reduxContext from "../reactContext";
import { useLayoutEffect, useEffect, useReducer, useRef, useSyncExternalStore, useState } from "react";

function useSelector(selectorFn) {
    const lastSelectedState = useRef(null);

    const { store } = useContext(reduxContext);
    const state = store.getState();

    // 拿到 selectorFn 运算的 状态
    const selectedState = selectorFn(state);

    // 订阅仓库的变化，当仓库数据发生变化，刷新组件
    const [, forceUpdate] = useReducer((x) => x + 1, 0);


    const renderFn = () => {
        // debugger

        let selectedState1 = selectorFn(store.getState());
        
        // 最新的状态和 上一次状态对比， 不相等 触发 渲染
        if (!shallow(selectedState1, lastSelectedState.current)) {
            
            forceUpdate();
            lastSelectedState.current =  selectedState1;
            // debugger
        }
    }

    useLayoutEffect(() => {

        // 源码没有返回 unsubscribe
        store.subscribe(renderFn);
        return () => store.unsubscribe(renderFn);
    }, []);

    // react 18 新 api useSyncExternalStore
    // useSyncExternalStore(store.subscribe, () => selectorFn(store.getState()))
    return selectedState;
}

export default useSelector;

// const useSyncExternalStore = (subscribe, getSnapShot) => {
//     let [state, setState] = useState(getSnapShot)
//     useLayoutEffect(() => {
//         subscribe(() => {
//             setState(getSnapShot())
//         })
//     }, [])
//     return state
// }

function shallow(prevObj = {},nextObj = {}){
    if(prevObj === nextObj){
        return true
    }

    if(typeof prevObj !== 'object' || prevObj === null || typeof nextObj !== 'object' || nextObj === null){
        return false
    }

    let prevLen = Object.keys(prevObj || {}).length
    let nextObjLen = Object.keys(nextObj || {}).length
    if(prevLen !== nextObjLen){
        return false
    }

    for(let key in prevObj){
        // 比较key
        // 比较值

        // 这样写，如果对象是 Object.create(null) 创建的就会出现问题
        // if(!(nextObj.hasOwnProperty(key)) || prevObj[key] !== nextObj[key]){

    
        if(!(Object.hasOwnProperty.call(nextObj, key)) || prevObj[key] !== nextObj[key]){
            return false
        }
    }
    return true
}
