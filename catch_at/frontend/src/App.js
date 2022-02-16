import React from "react" ;
import "./App.css";
import NotAuth from "./components/pages/mainNotAuthPage/notAuth"
import {Route, BrowserRouter} from "react-router-dom";
import Register from "./components/pages/register/register";
import Login from "./components/pages/login/login";
import Footer from "./components/shared/footer/footer";
import MainPage from "./components/pages/mainPage/mainPage";
import {axiosResponse, axiosRequest} from './services/token';
import { useSelector } from "react-redux";


function App() {
  let token = useSelector(state => state.tokenState.token);
  axiosResponse(token);
  axiosRequest(token);
  return (
    <BrowserRouter>
    <div className="page">
      <Route component={NotAuth} path="/notAuth" />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={MainPage} exact path="/"/>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;