import React, { useMemo } from 'react';
import fn from './test1'

export default function App(){
    console.log('render')
    const {add1, add2} = fn()

    const Button1 = useMemo(() => {
        return <button onClick={add2}>add2</button>
    }, [])

    return <div>
        <button onClick={add1}>add1</button>
        {
            Button1
        }
    </div>
}