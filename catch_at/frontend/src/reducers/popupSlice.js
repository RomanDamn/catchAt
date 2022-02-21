import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    id: 0, 
    isActive: false,
};

const isActivePopup = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        makePopupActive(state, action){
            return{
                ...state,
                isActive: action.payload,
            }
        }
    }
})

export const {makePopupActive} = isActivePopup.actions;
export default isActivePopup.reducer;