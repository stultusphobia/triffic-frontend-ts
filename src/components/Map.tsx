import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const Map = () => {

  const map = useRef(null);

  const loader = new Loader({
    apiKey: "AIzaSyC6m1ftu1-HZGkirCXyvq55O1peRziwQI8",
    version: "weekly",
    libraries: ["places"]
  });
  
  const mapOptions = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
  };

  useEffect(() => {
    document.getElementById('root')!.classList.add('flex-for-map');

    loader
      .load()
      .then((google) => new google.maps.Map(map.current, mapOptions))
      .catch(e => console.error(e));

      return () => document.getElementById('root')!.classList.remove('flex-for-map');
  }, [])

  return (
    <div className="w-full h-full" ref={map}/>
  );
};

export default Map
