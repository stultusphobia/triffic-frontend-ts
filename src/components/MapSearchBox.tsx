import React, { useState, useEffect, useRef } from 'react'
import { SearchIcon } from '@heroicons/react/solid'

import MapMarker from './MapMarker'

interface Props {
  google: typeof google,
  map: React.MutableRefObject<google.maps.Map>
}

const MapSearchBox = ({ google, map }: Props) => {

  const input = useRef<HTMLInputElement>(null)
  const searchBox = useRef<google.maps.places.SearchBox>()

  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>()

  useEffect(() => {
    searchBox.current = new google.maps.places.SearchBox(input.current as HTMLInputElement)
    map.current.addListener("bounds_changed", () => {
      searchBox.current.setBounds(map.current.getBounds() as google.maps.LatLngBounds)
    })
    searchBox.current.addListener("places_changed", () => {
      setPlaces(searchBox.current.getPlaces())
    })
  }, [])

  useEffect(() => {
    if(!places) return

    const bounds = new google.maps.LatLngBounds()
    places.forEach((place) => {
      if (place.geometry && place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    })
    map.current.fitBounds(bounds);
  }, [places])

  function renderPlaces() {

    if (!places || places.length === 0) 
      return
    
    return places.map((place, idx) => {
      if (!place.geometry || !place.geometry.location) 
        return console.error("Returned place contains no geometry")

      const props = {
        google,
        map,
        position: place.geometry.location,
        place
      }

      return (
        <MapMarker key={idx} {...props} />
      )
    })
  }
    

  return (
    <React.Fragment>
      <div className="absolute z-10 top-2 left-1/2 -ml-48 w-96 flex shadow-md">
        <input
          type="text"
          ref={input}
          className="flex-grow pl-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 "
          placeholder="Search"
        />
        <SearchIcon className="flex-shrink w-6 items-center border border-l-0 border-gray-300 bg-white text-indigo-500"/>
      </div>
      { renderPlaces() }
    </React.Fragment>
  )

};

export default MapSearchBox
