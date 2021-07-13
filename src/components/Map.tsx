import React from 'react'

interface Props {
  mapElementRef: React.MutableRefObject<HTMLDivElement>
}

const Map = ({ mapElementRef }: Props) => {
  
  return (
    <div className="w-full h-full" ref={mapElementRef} />
  )
}

export default React.memo(Map)
