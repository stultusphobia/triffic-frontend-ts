import { useEffect, useRef } from 'react'

interface Props {
  google: typeof google
  map: React.MutableRefObject<google.maps.Map>,
  center: { lat: number, lng: number }
  position?: { lat: number, lng: number }
}

const MapMarker = ({ google, map, center, position }: Props) => {

  const marker = useRef<google.maps.Marker>();

  useEffect(() => {
    const pos = position || center
    marker.current = new google.maps.Marker({ map: map.current, position: pos })
    return () => marker.current?.setMap(null)
  }, [])

  return null

};

export default MapMarker
