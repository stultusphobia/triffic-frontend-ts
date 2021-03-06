import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import MapWapper from '../components/MapWapper'
import MapMarker from '../components/MapMarker'
import MapSearchBox from '../components/MapSearchBox'
import AttrFinder from '../components/AttrFinder'

const AttractionSelector = () => {

  const [googleapi, setGoogleapi] = useState<typeof google>()

  const loader = new Loader({
    apiKey: "AIzaSyC6m1ftu1-HZGkirCXyvq55O1peRziwQI8",
    version: "weekly",
    libraries: ["places"]
  });

  useEffect(() => {
    loader.load().then((google) => setGoogleapi(google))
  }, [])

  function render() {
    return (
      <React.Fragment>
        <MapWapper google={googleapi}>
          <AttrFinder />
          <MapSearchBox />
          <MapMarker position={{ lat: 23.22, lng: 120.419 } as google.maps.LatLngLiteral}/>
          <MapMarker position={{ lat: 23.22, lng: 120.319 } as google.maps.LatLngLiteral}/>
        </MapWapper>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
      <main className="relative flex-grow ">
        { googleapi ? render() : null } 
      </main>
    </React.Fragment>
  );
};

export default AttractionSelector
