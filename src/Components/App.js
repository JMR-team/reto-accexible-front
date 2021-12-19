import React from "react";
import "./App.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from "../Pages/Home/Home";
import NavBar from "../Components/NavBar/NavBar";
import Login from  "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Test from '../Pages/Test/Test'



function App() {
  return (
    <div>
    <Router>
      <NavBar />
    {/* <NavBarComponent /> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-ansiedad" element={<Test />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={<Signup />} /> 
        </Routes>
    </Router>
</div>
  );
}

export default App;
