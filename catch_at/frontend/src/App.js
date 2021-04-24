import React from "react" ;
import "./App.css";
import NotAuth from "./components/notAuthPage/notAuth"
import {Route, BrowserRouter} from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Footer from "./components/footer/footer";


function App() {
  return (
    <BrowserRouter>
    <div className="page">
      <Route component={NotAuth} path="/notAuth" />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
