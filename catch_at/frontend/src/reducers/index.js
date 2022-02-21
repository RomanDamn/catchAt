import { combineReducers } from "@reduxjs/toolkit";
import isActiveReducer from "./isActiveButtonSlice";
import isActivePopupReducer from "./popupSlice";
import tokenReducer from "./tokenSlice"

const rootReducer = combineReducers({
    isActiveState: isActiveReducer,
    tokenState: tokenReducer,
    popupState: isActivePopupReducer,
})
export default rootReducer;