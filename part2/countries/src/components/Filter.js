import React from "react";
import Details from "./Details";
import Button from "./Button";

const Filter = (props) => {
  const names = props.filteredCountries.map((country) => country.name.common);

  if (props.filteredCountries.length === 1) {
    return (
      <>
        <Details detail={props.filteredCountries} />
      </>
    );
  }

  return (
    <div>
      {names.length <= 10 ? (
        names.map((name) => (
          <div key={name}>
            {name}
            {"  "}
            <Button filteredCountries={props.filteredCountries} name={name} />
          </div>
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default Filter;
