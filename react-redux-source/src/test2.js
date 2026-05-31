import React, { useMemo } from 'react';



const Com3 = () => {
    return <span><div dangerouslySetInnerHTML={{__html: '111'}}></div></span>
}


const Com1 = () => {
    return <div>
        11
        <Com2 dangerouslySetInnerHTML={{__html: '2222'}}/>
        <Com3/>
    </div>
}

const Com2 = () => {
    return <div>我是Com2</div>
}
export default function App(){
    return <div>
       <Com1/>
    </div>
}