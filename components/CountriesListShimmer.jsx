import React from 'react'
import './CountriesShimmer.css'
export default function CountriesListShimmer() {

  return (
    <div className='countries-container'>
        {Array.from({ length:20 }).map((i) => {
        return <div key={i} className="country-card shimmer-card"></div>
    })}
    </div>
  )
}
