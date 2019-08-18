import {combineReducers} from 'redux'
import counter from './counter'
import home from './home'
import session from './session'

export default combineReducers({
    counter,
    home,
    session
})
