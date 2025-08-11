
import ReactDom from 'react-dom/client'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";


/*** createApi ***/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todoapi 上存在一个属性 useGetTodoQuery
const todoapi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000' }),
    endpoints: (builder) => {
        return {
            getTodo: builder.query({ query: (id) => `/todos/deatail/${id}` })
        }
    }
})
// todoapi 上存在一个属性 useGetTodoQuery

/*** createApi ***/


const store = configureStore({
    name: 'test',
    reducer: {
        [todoapi.reducerPath]: todoapi.reducer
    },

    // 保留默认的 thunk 中间件， 添加新的中间件进来
    middleware: (getDefaultMiddlewrare) => {
        return getDefaultMiddlewrare().concat(todoapi.middleware)
    }
})

function Test(){
    console.log('1111')
    const { isLoading, error, data } = todoapi.endpoints.getTodo.useQuery(1) // useGetTodoQuery(1)

    if( isLoading ){
        return<div>加载中...</div>
    } else if(data){
        return <div>数据加载正常...{ data.text }</div>
    } else if(error){
        return <div>数据加载失败...{ error.error }</div>
    } else {
        return null
    }
}



ReactDom.createRoot(document.getElementById("root")).render(<Provider store={store}><Test /></Provider>);