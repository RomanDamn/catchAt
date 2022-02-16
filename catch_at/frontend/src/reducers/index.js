import { combineReducers } from "@reduxjs/toolkit";
import isActiveReducer from "./isActiveButtonSlice";
import tokenReducer from "./tokenSlice"

const rootReducer = combineReducers({
    isActiveState: isActiveReducer,
    tokenState: tokenReducer
})
export default rootReducer;