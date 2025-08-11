import createSlice from "../createSlice"

export const createApi = ({ reducerPath, baseQuery, endpoints }) => {

    const { reducer, actions } = createSlice({
        name: reducerPath,
        initialState: { data: undefined, error: undefined, isLoading: false },
        reducers: {
            setValue(state, { payload }){
                for (const key in payload) {
                    state[key] = payload[key];    
                }
            }
        }
    })

    const api = {
        reducerPath,
        reducer,
        middleware
    }

    return api
} 

export const fetchBaseQuery = ({ baseUrl }) => {
    return async function(url){
        const url = baseUrl + url
        return await fetch(url).then(res => res.json())
    }
}