import { observe } from './index'
import { arrayMethods } from './array'

export function defineReactive(data,key,value){
    observe(value)
    
    Object.defineProperty(data, key, {
        get(){
            return value;
        },
        set(newValue){
            if(newValue === value) return
            observe(newValue)
            value = newValue
        }
    })
}

export default class Observe {
    constructor(data){
        if(Array.isArray(data)){
            // data.__proto__ = arrayMethods;
            Object.setPrototypeOf(data,arrayMethods)
            observableArray(data)
        }else{
            this.walk(data)
        }
    }

    walk(data){
        let keys = Object.keys(data)
        for(let i=0; i< keys.length; i++){
            let key = keys[i]
            let value = data[key]

            defineReactive(data,key,value)
        }
    }
}