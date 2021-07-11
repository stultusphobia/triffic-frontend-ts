import React, { useState, useEffect, useRef } from 'react'

interface Props {
  google: typeof google
  zoom?: number,
  initCenter?: { lat: number, lng: number }
}

const Map = ({ google, zoom = 12, initCenter = { lat: 0, lng: 0 } }: Props) => {

  const mapRef = useRef({} as HTMLDivElement);

  const [currCenter, setCurrCenter] = useState(initCenter);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    document.getElementById('root')?.classList.add('flex-for-map');
    getCurrentPos();
    setMap(new google.maps.Map(mapRef.current, {center: currCenter, zoom}))

    return () => document.getElementById('root')?.classList.remove('flex-for-map');
  }, [])

  useEffect(() => {
    if (map) {
      map.panTo(currCenter)
    }
  }, [currCenter])

  const getCurrentPos = (): void => {
    if (!navigator || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    })
  }

  return (
    <div className="w-full h-full" ref={ mapRef }/>
  );
};

export default Map
