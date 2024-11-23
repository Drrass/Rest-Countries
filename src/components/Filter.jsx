// Filter.jsx
import React from "react";

const Filter = ({ onSearchChange, onRegionChange, darkMode }) => {
  return (
    <section className={`filter flex justify-between items-center p-4 shadow ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <form className="control ml-8 h-12">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country"
          className={`w-100 h-12 px-4 border rounded-lg ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </form>
      <div>
        <select
          name="select"
          id="select"
          className={`select ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <option value="">Filter By Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
