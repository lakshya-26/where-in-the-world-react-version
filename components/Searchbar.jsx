import React from "react";

export default function Searchbar({setQuery}) {
  return (
    <>
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass" />
        <input 
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text" 
        placeholder="Search for a Country..." />
      </div>
    </>
  );
}
