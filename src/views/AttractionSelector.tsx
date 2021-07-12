import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Map from '../components/Map'
import MapMarker from '../components/MapMarker'

const AttractionSelector = () => {

  const [googleapi, setGoogle] = useState({} as typeof google)

  const loader = new Loader({
    apiKey: "AIzaSyC6m1ftu1-HZGkirCXyvq55O1peRziwQI8",
    version: "weekly",
    libraries: ["places"]
  });

  useEffect(() => {
    loader
      .load()
      .then((google) => setGoogle(google))
  }, [])

  return (
    <React.Fragment>
      <main className="flex-grow">
        { googleapi.maps ? 
        <Map google={googleapi}>
          <MapMarker position={{ lat: 23.22, lng: 120.419 }}/>
          <MapMarker position={{ lat: 23.22, lng: 120.319 }}/>
        </Map> : <div />}
      </main>
    </React.Fragment>
  );
};

export default AttractionSelector
