import { combineReducers } from "redux";
import isActiveButtonReducer from "./isActiveButtonReducer";

const rootReducer = combineReducers({
    isActive: isActiveButtonReducer
})
export default rootReducer;