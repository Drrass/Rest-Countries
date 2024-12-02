import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);

      // Extract unique currencies
      const allCurrencies = new Set();
      data.forEach((country) => {
        if (country.currencies) {
          Object.keys(country.currencies).forEach((currency) => {
            allCurrencies.add(country.currencies[currency].name);
          });
        }
      });
      setCurrencies([...allCurrencies]);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    let filtered = countries;

    // Filter by region if selected
    if (selectedRegion) {
      filtered = filtered.filter((country) => country.region === selectedRegion);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected currency
    if (selectedCurrency) {
      filtered = filtered.filter((country) => {
        return (
          country.currencies &&
          Object.values(country.currencies).some(
            (currency) => currency.name === selectedCurrency
          )
        );
      });
    }

    setFilteredCountries(filtered);
  }, [selectedRegion, searchQuery, selectedCurrency, countries]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <Filter
        onSearchChange={setSearchQuery}
        onRegionChange={setSelectedRegion}
        onCurrencyChange={setSelectedCurrency}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currencies={currencies}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredCountries.map((country) => {
          const { name, cca3, flags, population, region, capital } = country;
          return (
            <Link
              to={`/countries/${name.common}`}
              key={cca3}
              className="shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
              state={{ name, cca3, flags, population, region, capital }}
            >
              <article className={`p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <img
                  src={flags.png}
                  alt={name.common}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
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
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Countries;
