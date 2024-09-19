
import {useContext} from "react"
import reduxContext from "../reactContext"
function useDispatch() {

    const { store: { dispatch } = {} } = useContext(reduxContext)

    return dispatch
}

export default useDispatch