import React from "react";

const Details = ({ detail, weather }) => {
  console.log(weather);
  const flagLink = detail[0].flags["svg"];
  return (
    <>
      <h1>{detail[0].name.common}</h1>

      <p>capital {detail[0].capital[0]} </p>
      <p>area {detail[0].area}</p>

      <h4>languages :</h4>
      <ul>
        {Object.keys(detail[0].languages).map((k) => (
          <li key={k}>{detail[0].languages[k]}</li>
        ))}
      </ul>

      <img src={flagLink} width={150} height={150} alt="flag" />

      <h3>Weather in {detail[0].name.common}</h3>
      <p>weather {weather.main.temp} Celsius</p>
      <p> wind {weather.wind.speed} m/s </p>
    </>
  );
};

export default Details;
