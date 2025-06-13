const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})

export const{setUser,setLoading,setToken} = authSlice.actions;
export default authSlice.reducer;