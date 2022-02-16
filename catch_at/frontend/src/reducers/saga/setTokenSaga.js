import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import tokenSlice from "../tokenSlice"

export function* setTokenSaga() {   
    yield takeLatest(tokenSlice.actions.setToken, tokenRequested);
    console.log("In setTokernSaga")
  }

  function* tokenRequested(payload) {
      console.log("in tokenRequested")
    try{
        //setError(<div className={s.waiting}>Waiting ....</div>)
        const response = yield axios.post("http://localhost:8000/api/auth/login", {
            username: payload.username,
            password: payload.password
        })
        //const token = useDispatch(setToken(response.data.token))
        console.log("I am in saga");
        console.log(response.data);
        //console.log(token)
        yield put(tokenSlice.actions.setToken(response.data.token));

    }catch(error){
        console.log(error.response.data.message);
        //setError(error.response.data.message)
        
    }
}
      