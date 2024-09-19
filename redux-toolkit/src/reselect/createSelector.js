export default function createSelector(selectList, cb){
    let lastState
    let lastValue
    return function(state){
        if(lastState === state){
            return lastValue
        }

        const listValues = selectList.map((itemSelect) => {
            return itemSelect(state)
        })

        lastValue = cb(...listValues)
        lastState = state
        return lastValue
    }
}