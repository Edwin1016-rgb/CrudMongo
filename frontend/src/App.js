import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Users from "./components/Users/Users";
import Navbar from "./components/Navbar/Navbar";
import FindUsers from "./components/FindUsers/FindUsers";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4" >
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/findUsers" element={<FindUsers />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
