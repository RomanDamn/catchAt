import { combineReducers } from "@reduxjs/toolkit";
import isActiveReducer from "./isActiveButtonSlice";

const rootReducer = combineReducers({
    isActiveState: isActiveReducer,
})
export default rootReducer;