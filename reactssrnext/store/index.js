import { legacy_createStore as createStore } from 'redux';

import {reducer} from './reducer'

// console.log(createStore, 'reducerreducerreducer')
export default function createStoreWrap(initState){
    return createStore(reducer, initState)
}