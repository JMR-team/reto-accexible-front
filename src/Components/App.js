import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "../Components/NavBar/NavBar";

// Pages
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Test from "../Pages/Test/Test";
import PersonalPage from "../Pages/PersonalPage/PersonalPage";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-ansiedad" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PersonalPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
