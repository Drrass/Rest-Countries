import React from 'react';

const Filter = ({ onRegionChange }) => {
  const handleRegionChange = (e) => {
    onRegionChange(e.target.value);
  };

  return (
    <section className="filter flex justify-between items-center p-4 bg-gray-100 shadow">
      <form className="control ml-8 h-12">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country"
          className="w-100 h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <div>
        <select
          name="select"
          id="select"
          className="select"
          onChange={handleRegionChange}
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
