import React, { useState, useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server';

import MapInfoWindowContent from './MapInfoWindowContent'

interface Props {
  google: typeof google
  map: React.MutableRefObject<google.maps.Map>,
  position: google.maps.LatLng | google.maps.LatLngLiteral
  place: google.maps.places.PlaceResult
}

const MapMarker = ({ google, map, position, place }: Props) => {

  const marker = useRef<google.maps.Marker>();
  const infoWindow = useRef<google.maps.InfoWindow>();

  const [openInfoWindow, setOpenInfoWindow] = useState(false);


  useEffect(() => {
    marker.current = new google.maps.Marker({ map: map.current, position });

    if(!place) return
    infoWindow.current = new google.maps.InfoWindow({
      content: renderToString(<MapInfoWindowContent place={place}/>)
    });

    marker.current.addListener("click", () => setOpenInfoWindow(state => !state));

    return () => {
      marker.current?.setMap(null)
      if(infoWindow.current) infoWindow.current.close()
    }
  }, [])

  useEffect(() => {
    if(!infoWindow.current) return

    if(openInfoWindow) {
      infoWindow.current.open({
        anchor: marker.current,
        map: map.current,
        shouldFocus: false,
      })
    }
    else {
      infoWindow.current.close()
    }
  }, [openInfoWindow])

  return null

};

export default MapMarker
