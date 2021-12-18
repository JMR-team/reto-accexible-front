import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from  "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Test from '../Pages/Test/Test'



function App() {
  return (
    <div>
    <Router>
    {/* <NavBarComponent /> */}
        <Routes>
            <Route path="/" element={<h1> landing page </h1>} />
            <Route path="/test-ansiedad" element={<Test />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={<Signup />} /> 
        </Routes>
    </Router>
</div>
  );
}

export default App;
