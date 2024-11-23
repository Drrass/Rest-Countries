import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      setCountry(data[0]);
    };
    fetchCountryData();
  }, [name]);

  if (!country) {
    return <p>Loading...</p>;
  }

  // Get the native name (use first language if available)
  const nativeName = country.nativeName
    ? Object.values(country.nativeName)[0]
    : "N/A";
  const subregion = country.subregion || "N/A";
  const topLevelDomain = country.tld ? country.tld.join(", ") : "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => curr.name)
        .join(", ")
    : "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const borderCountries = country.borders || []; // Get border countries

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-700 bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 text-lg"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back Home
      </Link>

      <div className="mt-8 flex flex-col lg:flex-row items-start gap-12">
        <div className=" ">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-[400px] h-auto rounded shadow" // Set width to 600px
          />
        </div>

        {/* Country Details */}
        <div className="flex-1">
          {/* Country Name */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            {country.name.common}
          </h1>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="text-lg">
              <p>
                <strong className="font-bold">Native Name:</strong>{" "}
                <span>{nativeName}</span>
              </p>
              <p>
                <strong className="font-bold">Population:</strong>{" "}
                <span>{country.population}</span>
              </p>
              <p>
                <strong className="font-bold">Region:</strong>{" "}
                <span>{country.region}</span>
              </p>
              <p>
                <strong className="font-bold">Sub Region:</strong>{" "}
                <span>{subregion}</span>
              </p>
              <p>
                <strong className="font-bold">Capital:</strong>{" "}
                <span>{country.capital || "N/A"}</span>
              </p>
            </div>

            {/* Right Column */}
            <div className="text-lg">
              <p>
                <strong className="font-bold">Top Level Domain:</strong>{" "}
                <span>{topLevelDomain}</span>
              </p>
              <p>
                <strong className="font-bold">Currencies:</strong>{" "}
                <span>{currencies}</span>
              </p>
              <p>
                <strong className="font-bold">Languages:</strong>{" "}
                <span>{languages}</span>
              </p>
            </div>
          </div>

          {/* Border Countries */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Border Countries:</h2>
            {borderCountries.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {borderCountries.map((border, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded shadow text-gray-700"
                  >
                    {border}
                  </span>
                ))}
              </div>
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
