export function createStoreHook(context = {}) {
    return function useStore() {
        return ['11', '22', '33']
    }
}


export const useStore = /*#__PURE__*/ createStoreHook()