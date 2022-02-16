import { fork } from "redux-saga/effects";
import { setTokenSaga } from "../reducers/saga/setTokenSaga";


export function* rootSaga() {
    yield fork(setTokenSaga); 
}