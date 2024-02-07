import React, { useEffect, useState } from "react";
import './countryDetails.css';
import { Link, useLocation, useParams } from "react-router-dom";
// import { ThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetails() {
    const params = useParams();
    const countryName = params.CountryDetails;

    const {state} = useLocation();
    const [isDark] = useTheme();
    
    const [countryData, setCountryData] = useState(null)
    const [notFound, setNotFound] = useState(false);

    function updateCountry(data){
        setCountryData({
            name: data.name.common || data.name,
            nativeName: Object.values(data.name.nativeName || {})[0]?.common,
            flag: data.flags.svg,
            population: data.population,
            region: data.region,
            subRegion: data.subregion,
            capital: data.capital?.join(', '),
            tld: data.tld.join(', '),
            currencies: Object.values(data.currencies || {}).map((currency) => currency.name).join(', '),
            languages: Object.values(data.languages || {}).join(', '), 
            borders: []
        })

        if(!data.borders){
            data.borders=[]
        }
        Promise.all(data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common)
        })).then((borders) => {
            setTimeout(() => setCountryData((prevState) => ({...prevState, borders})))
        })
    }

    useEffect(() => {

        if(state){
            updateCountry(state);
            return
        }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
        .then(([data]) => {
            updateCountry(data);
        }).catch(err => {
            setNotFound(true);
        })
    },[countryName])

    if(notFound){
        return <div>
            Country Not Found.
        </div>
    }
  return (
      countryData === null ? 'loading....' : <main className={`${isDark?'dark':''}`}>
            <div className="country-details-container">
                <span className="back-button" onClick={() => history.back()}><i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</span>
            <div className="country-details">
                <img src={countryData.flag} alt="flag" />
                <div className="details-text">
                    <h1>{countryData.name}</h1>
                    <div className="details-text-container">
                        <p><b>Native Name:</b> <span className="native-name">{countryData.nativeName || countryData.name}</span></p>
                        <p><b>Population:</b> <span className="population">{countryData.population.toLocaleString("en-IN")}</span></p>
                        <p><b>Region:</b> <span className="region">{countryData.region}</span></p>
                        <p><b>Sub Region:</b> <span className="sub-region">{countryData.subRegion}</span></p>
                        <p><b>Capital:</b> <span className="capital">{countryData.capital}</span></p>
                        <p><b>Top Level Domain:</b> <span className="top-level-domain">{countryData.tld}</span></p>
                        <p><b>Currencies:</b> <span className="currencies">{countryData.currencies}</span></p>
                        <p><b>Languages:</b> <span className="languages">{countryData.languages}</span></p>
                    </div>
                    {countryData.borders.length !==0 && <div className="border-countries">
                        <b>Border Countries:</b>&nbsp;&nbsp; 
                        {
                            countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
                        }
                    </div>}
                </div>
            </div>
            </div>
        </main>
  );
}
