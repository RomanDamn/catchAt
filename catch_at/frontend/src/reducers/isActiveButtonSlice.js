import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    id: 0, 
    isActive: false,
};

const isActiveButtonSlice = createSlice({
    name: 'activeButton',
    initialState,
    reducers: {
        makeActive(state, action){
            return{
                ...state,
                id: action.payload,
                isActive: true,
            }
        }
    }
})

export const {makeActive} = isActiveButtonSlice.actions;
export default isActiveButtonSlice.reducer;