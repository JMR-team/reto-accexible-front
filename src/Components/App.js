import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Test from './Test/Test'



function App() {
  return (
    <div>
    <Router>
    {/* <NavBarComponent /> */}
        <Routes>
            <Route path="/" element={<h1> landing page </h1>} />
            <Route path="/test-ansiedad" element={<Test />} />
            <Route path="/login" element={<h1> log in  </h1>} />
            <Route path="/signup" element={<h1> sign up </h1>} /> 
        </Routes>
    </Router>
</div>
  );
}

export default App;
