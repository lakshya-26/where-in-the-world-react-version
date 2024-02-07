import React, { useState } from "react";
import Searchbar from "./Searchbar";
import SelectMenu from "./SelectMenu";
import CountriesContainer from "./CountriesContainer";
// import { useOutletContext } from "react-router-dom";
// import { ThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "../hooks/useTheme";

export default function home() {
    const [query, setQuery] = useState('');
    const [isDark] = useTheme();
    
  return (
    <>
      <main className={`${isDark?'dark':''}`}>
        <div className="search-filter-container">
          <Searchbar setQuery={setQuery} />
          <SelectMenu setQuery={setQuery}/>
        </div>
        <CountriesContainer query={query} />
      </main>
    </>
  );
}
