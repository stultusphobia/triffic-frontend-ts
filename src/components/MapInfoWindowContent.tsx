import React from 'react'

interface Props {
  place: google.maps.places.PlaceResult
}

const MapInfoWindowContent = ({ place }: Props) => {
  
  return (
    <div id="content">
      <h1 id="firstHeading" className="firstHeading">{place.name}</h1>
      <div id="bodyContent">
        {JSON.stringify(place)}
      </div>
    </div>
  )
}

export default React.memo(MapInfoWindowContent)
