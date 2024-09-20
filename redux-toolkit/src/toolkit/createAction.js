export default function createAction(type,prepareAction){
     function actionCreate(payload){
        // debugger
        if(prepareAction){
            // debugger
            const prepared = prepareAction(payload)
            return {
                type,
                ...prepared
            }
        }
        return {
            type,
            payload
        }
    }
    actionCreate.type = type

    return actionCreate
}