import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./components/countries";
import Header from "./components/Header";
import Country from "./components/Country";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/countries/:name" element={<Country />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
