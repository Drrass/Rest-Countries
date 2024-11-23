import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await response.json();
      setCountry(data[0]);
    };
    fetchCountryData();
  }, [name]);

  if (!country) {
    return <p>Loading...</p>;
  }

  // Get the native name (use first language if available)
  const nativeName = country.nativeName ? Object.values(country.nativeName)[0] : 'N/A';
  const subregion = country.subregion || 'N/A';
  const topLevelDomain = country.tld ? country.tld.join(', ') : 'N/A';
  const currencies = country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';




  return (
    <>
      <Link to="/" className='btn - btn-light'>
        <i className='fas fa-arrow-left'>Back home</i>
      </Link>

      <div>
        <img src={country.flags.png} alt={country.name.common} />
      </div>

      <div>
        <strong>Native Name:</strong> <span>{nativeName}</span><br />
        <strong>Population:</strong> <span>{country.population}</span><br />
        <strong>Region:</strong> <span>{country.region}</span><br />
        <strong>Sub Region:</strong> <span>{subregion}</span><br />
        <strong>Capital:</strong> <span>{country.capital || 'N/A'}</span><br />
      </div>

      <div>
      <strong>Top Level Domain:</strong> <span>{topLevelDomain}</span><br />
        <strong>Currencies:</strong> <span>{currencies}</span><br />
        <strong>Languages:</strong> <span>{languages}</span><br />

      </div>
    </>
  )
}

export default Country;
