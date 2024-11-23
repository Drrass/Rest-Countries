// Countries.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://restcountries.com/v3.1/all";

const Countries = ({ selectedRegion, searchQuery, darkMode }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await fetch(url);
      const countries = await response.json();
      setCountries(countries);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    let filtered = countries;
    if (selectedRegion) {
      filtered = filtered.filter((country) => country.region === selectedRegion);
    }
    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCountries(filtered);
  }, [selectedRegion, searchQuery, countries]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredCountries.map((country) => {
        const { name, cca3, flags, population, region, capital } = country;

        return (
          <article
            key={cca3}
            className={`shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          >
            <img src={flags.png} alt={name.common} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4">
              <h3 className="text-lg font-bold">{name.common}</h3>
              <h4 className="text-sm mt-2">
                <strong>Population:</strong> <span>{population}</span>
              </h4>
              <h4 className="text-sm">
                <strong>Region:</strong> <span>{region}</span>
              </h4>
              <h4 className="text-sm">
                <strong>Capital:</strong> <span>{capital || "N/A"}</span>
              </h4>
              <Link to={`/countries/${name.common}`}>Learn More</Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Countries;
