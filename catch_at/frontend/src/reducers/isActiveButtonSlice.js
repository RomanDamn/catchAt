import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    id: 0, 
    isActive: false,
};

// export default function isActiveButtonReducer(state=defaultState, action){
//     switch (action.type){
//         case MAKE_ACTIVE:
//             return {
//                 id: action.payload.id,
//                 isActive: true
//             }
//         // case MAKE_DISACTIVE:
//         //     return {
//         //         isActive: false
//         //     }
//         default:
//             return state
//     }

    
// }
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