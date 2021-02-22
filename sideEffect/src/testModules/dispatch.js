export function createDispatchHook(context = {}) {
    return function useDispatch() {
        const store = {
            dispatch: () => {}
        }
        return store.dispatch
    }
}

export const useDispatch = /*#__PURE__*/ createDispatchHook();