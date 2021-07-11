import React, { useState, useEffect, useRef } from 'react'

interface Props {
  google: typeof google
  zoom?: number,
  initCenter?: { lat: number, lng: number }
}

const Map = ({ google, zoom = 12, initCenter = { lat: 0, lng: 0 } }: Props) => {

  const mapElementRef = useRef({} as HTMLDivElement);
  const map = useRef<google.maps.Map>();

  const [currCenter, setCurrCenter] = useState(initCenter);

  useEffect(() => {
    function getCurrentPos() {
      if (!navigator || !navigator.geolocation) return
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }

    document.getElementById('root')?.classList.add('flex-for-map');
    getCurrentPos();
    map.current = new google.maps.Map(mapElementRef.current, {center: currCenter, zoom})

    return () => document.getElementById('root')?.classList.remove('flex-for-map');
  }, [])

  useEffect(() => {
    if (map.current) {
      map.current.panTo(currCenter)
    }
  }, [currCenter])

  return (
    <div className="w-full h-full" ref={ mapElementRef }/>
  );
};

export default Map
