import { produce } from 'immer'
export const immer = (createState) => {
    return (set, get, api) => {
        api.setState = (updater) => {
            const nextState = produce(updater)
            return set(nextState)
        }

        return createState(api.setState, get, api)

        // 最原始的 版本的 set
        // return createState(set, get, api)
    }
}

export default immer