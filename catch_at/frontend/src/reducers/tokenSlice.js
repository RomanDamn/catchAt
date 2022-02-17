import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    token: ""
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            return {
                ...state,
                token: action.payload
            }
        },
        tokenRequest: (state, action) =>{
            return {
                ...state,
            }
        } 
    }
})

export const { setToken, tokenRequest } = tokenSlice.actions;
export default tokenSlice.reducer;