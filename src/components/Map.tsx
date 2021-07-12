import React, { useState, useEffect, useRef } from 'react'

interface Props {
  google: typeof google
  zoom?: number,
  initCenter?: { lat: number, lng: number }
  children?: React.ReactNode
}

const Map = ({ google, zoom = 12, initCenter = { lat: 0, lng: 0 }, children }: Props) => {

  const mapElementRef = useRef({} as HTMLDivElement);
  const map = useRef<google.maps.Map>();

  const [center, setCenter] = useState(initCenter);
  const [mapIsReady, setMapIsReady] = useState(false);

  useEffect(() => {
    function getCurrentPos() {
      if (!navigator || !navigator.geolocation) return
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }

    document.getElementById('root')?.classList.add('flex-for-map');
    getCurrentPos();
    map.current = new google.maps.Map(mapElementRef.current, { center, zoom });
    setMapIsReady(true);

    return () => document.getElementById('root')?.classList.remove('flex-for-map');
  }, [])

  useEffect(() => {
    if (map.current) {
      map.current.panTo(center)
    }
  }, [center])

  function renderChildren() {
    if(!children) return

    return React.Children.map(children, child => {
      if (React.isValidElement(child))
        return React.cloneElement(child, { google, map, center })
    })
  }

  return (
    <div className="w-full h-full" ref={ mapElementRef }>
      { mapIsReady ? renderChildren() : null }
    </div>
  );
};

export default Map
