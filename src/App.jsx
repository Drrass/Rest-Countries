import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from './components/Countries';
import Header from './components/Header';
import Filter from './components/Filter';
import Country from './components/Country';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter onRegionChange={setSelectedRegion} />
              <Countries selectedRegion={selectedRegion} />
            </>
          }
        />
        <Route path="/countries/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
