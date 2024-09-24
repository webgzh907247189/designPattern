

// import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { configureStore, createSlice, createAsyncThunk } from './toolkit'

// getTodoList 是一个 actionCreater (自动派发 3个 action)
const getTodoList = createAsyncThunk('todos/lists', async () => await new Promise(resolve => setTimeout(() => resolve('hello'), 2000)));

let initialState = { todos: [], loading: false, error: null }

const { reducer } = createSlice({
    name: 'test',
    initialState,
    // 这个 reducers 会添加前缀
    reducers: {},

    // 这个 extraReducers 不会添加前缀
    // 源码手动做的 添加前缀
    extraReducers: (builder) => {
        builder.addCase(getTodoList.pending, (state, action) => {
            // debugger
            state.loading = true
        }).addCase(getTodoList.fulfilled, (state, action) => {
            // debugger
            state.loading = false
            state.todos = action.payload
        }).addCase(getTodoList.rejected, (state, action) => {
            state.loading = false
            state.error =action.error
        })
    }
})

const store = configureStore({ reducer })

// store.dispatch(getTodoList()) -> 返回一个 promise
store.dispatch(getTodoList()).then(res => console.log(res, '成功了'), err => console.log(err, '失败了'))