import Details from "./Details";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Button = ({ filteredCountries, name }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [showDetail, setShowDetail] = useState(false);
  const [weather, setWeather] = useState({});

  const detail = filteredCountries.filter(
    (country) => country.name.common.toLowerCase() === name.toLowerCase()
  );

  const getWeather = (tmpCoordinates) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${tmpCoordinates.lat}&lon=${tmpCoordinates.lon}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${detail[0].capital}&limit=1&appid=${api_key}`
      )
      .then((response) => {
        const tmpCoordinates = {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        };

        getWeather(tmpCoordinates);
      });
  }, []);

  const detailToShow = showDetail ? (
    <Details detail={detail} weather={weather} />
  ) : (
    ""
  );
  return (
    <>
      <button onClick={() => setShowDetail(!showDetail)}>show</button>
      {detailToShow}
    </>
  );
};

export default Button;
