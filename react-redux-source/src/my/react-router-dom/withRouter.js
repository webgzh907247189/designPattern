import { Route } from "react-router"

export default function withRouter(Com){
    return (props) => {
        return <Route component={Com}/>
    }
}