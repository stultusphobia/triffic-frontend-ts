import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Map from '../components/Map'
import MapMarker from '../components/MapMarker'
import AttrFinder from '../components/AttrFinder'

const AttractionSelector = () => {

  const [googleapi, setGoogleapi] = useState<typeof google>()

  const loader = new Loader({
    apiKey: "AIzaSyC6m1ftu1-HZGkirCXyvq55O1peRziwQI8",
    version: "weekly",
    libraries: ["places"]
  });

  useEffect(() => {
    loader
      .load()
      .then((google) => setGoogleapi(google))
  }, [])

  function renderComponents() {
    return (
      <React.Fragment>
        <Map google={googleapi}>
          <AttrFinder google={googleapi} />
          <MapMarker position={{ lat: 23.22, lng: 120.419 }}/>
          <MapMarker position={{ lat: 23.22, lng: 120.319 }}/>
        </Map>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
      <main className="relative flex-grow ">
        { googleapi ? renderComponents() : null } 
      </main>
    </React.Fragment>
  );
};

export default AttractionSelector
