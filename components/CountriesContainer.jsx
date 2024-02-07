import React, { useEffect, useState } from "react";
// import CountriesData from "../CountriesData";
import CountriesCard from "./CountriesCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesContainer({ query }) {
  const [CountriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  return (
    <>
      {!CountriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {CountriesData.filter((country) =>
            country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
          ).map((country) => {
            return (
              <CountriesCard
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital?.[0]}
                key={country.name.common}
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
