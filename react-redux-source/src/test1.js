import { useCallback, useState } from "react"

export default () => {
    let [id, setId] = useState(0)
    const add1 = useCallback(() => {
        new Promise(() => {
            setTimeout(() => {
                setId(10)
                console.log('add1',id)
            }, 1000)
        })
    }, [])

    console.log(id, 'id外面')
    const add2 =  () => {
       console.log('add2', id)
    }

    return {
        add1,
        add2
    }
}

// 2. 看登陆文档
// 3. 写git 文档
// 4. 股票
// 5. 港股
// 6. fix react问题