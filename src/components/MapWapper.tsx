import React, { useState, useEffect, useRef } from 'react'

import Map from './Map'

interface Props {
  google: typeof google
  zoom?: number,
  initCenter?: { lat: number, lng: number }
  children?: React.ReactNode
}

const MapWapper = ({ google, zoom = 12, initCenter, children }: Props) => {

  console.log(`MapWapper rendered`)

  const mapElementRef = useRef({} as HTMLDivElement);
  const map = useRef<google.maps.Map>();

  const [mapCenter, setMapCenter] = useState(initCenter);
  const [mapIsReady, setMapIsReady] = useState(false);

  useEffect(() => {
    function getCurrentPos() {
      if (mapCenter) return
      if (!navigator || !navigator.geolocation) return
      navigator.geolocation.getCurrentPosition((pos) => {
        setMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }

    getCurrentPos();
    map.current = new google.maps.Map(mapElementRef.current, { zoom, mapTypeControl: false });
    setMapIsReady(true);

  }, [])

  useEffect(() => {
    if (map.current) {
      map.current.panTo(mapCenter || { lat: 0, lng: 0 })
    }
  }, [mapCenter])

  function renderChildren() {
    if(!children) return

    return React.Children.map(children, child => {
      if (React.isValidElement(child))
        return React.cloneElement(child, { google, map, center: mapCenter })
    })
  }

  return (
    <React.Fragment>
      <Map mapElementRef={mapElementRef} />
      { mapIsReady ? renderChildren() : null }
    </React.Fragment>
  );
};

export default MapWapper
