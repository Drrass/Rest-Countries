// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Country from "./components/Country";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <Router>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filter
                  onSearchChange={setSearchQuery}
                  onRegionChange={setSelectedRegion}
                  darkMode={darkMode}
                />
                <Countries
                  selectedRegion={selectedRegion}
                  searchQuery={searchQuery}
                  darkMode={darkMode}
                />
              </>
            }
          />
          <Route path="/countries/:name" element={<Country darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
