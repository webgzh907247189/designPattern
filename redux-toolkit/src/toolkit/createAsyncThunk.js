import createAction from "./createAction"

export default function createAsyncThunk(typePrefix, payloadCreator){
    // todos/list/pending
    let pending = createAction(typePrefix + '/pending', (payload) => {
        return { payload: void 0 }
    })
    let fulfilled = createAction(typePrefix + '/fulfilled', (payload) => {
        return { payload}
    })
    let rejected = createAction(typePrefix + '/rejected', (err) => {
        return { err }
    })

    function actionCreate(args){
        return (dispatch, getState) => {
            let abort

            const abortPromise = new Promise((resolve, reject) => {
                abort = () => reject('取消了请求')
            })

            dispatch(pending())

            let promise = payloadCreator()

            // 借助 race 实现 promise 取消
            return Promise.race([promise, abortPromise]).then(
                (payload) => dispatch(fulfilled(payload)),
                (err) => dispatch(rejected(err))
            )
        }
    }

    return Object.assign(actionCreate, {
        pending, 
        fulfilled,
        rejected
    })
}   