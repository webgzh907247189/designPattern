import React, { Suspense } from "react"

// ReactNode > ReactChild > ReactElement
type Props = { fallback: React.ReactNode; children: React.ReactElement }

// 自定义实现的 Suspense
class MySuspense extends React.Component<Props>{
    state = { loading: false }

    componentDidCatch(error){
        debugger
        if(typeof error.then === 'function'){
            this.setState({ loading: true })

            error.then(() => {
                this.setState({ loading: false })
            })
        }
    }

    render(){
        const { children, fallback } = this.props
        debugger
        return this.state.loading ? fallback : children
    }
}






const fetchUser = () => {
    return new Promise((r, j)  => {
        setTimeout(() => {
            r({ success: true, data: { id: 1, name: 'test' } })
        }, 2000);
    })
}

// React.lazy 实现原理
const createResource = (p) => {
    let status = 'pedding'
    let result

    p.then((data) => {
        status = 'success'
        result = data
    }, (error) => {
        status = 'error'
        result = error
    })

    return {
        read(){
            if(status == 'success' || status == 'error'){
                // debugger
                return result
            }else{
                // debugger
                throw p
            }
        }
    }
}

let userResource = createResource(fetchUser())

const User = () => {
    let result =  userResource.read() // await fetchUser
    if(result.success){
        return <>{result.data.id} {result.data.name}</>
    }
    return <>请求失败</>
}

const SuspenseTest = () => {
    return <Suspense fallback={<div> loading .... </div>}>
        <User />
    </Suspense>
}

export default SuspenseTest


// 3. lazy 
// 4. Suspense