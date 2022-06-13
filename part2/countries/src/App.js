import React, { useState, useEffect } from "react";

import axios from "axios";

import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountriess] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.value !== "") {
      const filteredCountriesByName = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(event.target.value);
      });

      setFilteredCountriess(filteredCountriesByName);
    } else {
      setFilteredCountriess([]);
    }
  };

  return (
    <div>
      <p>
        find countries <input type="text" onChange={handleChange} />
      </p>
      <Filter filteredCountries={filteredCountries} api_key={api_key} />
    </div>
  );
};

export default App;
