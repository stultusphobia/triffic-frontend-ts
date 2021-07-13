import React, { useEffect, useRef, useCallback } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { SearchIcon } from '@heroicons/react/solid'

interface Props {
  google: typeof google,
  map: React.MutableRefObject<google.maps.Map>
}

interface Inputs {
  search: string,
}

/**
 * TODO: try Places Search Box (https://developers.google.com/maps/documentation/javascript/examples/places-searchbox)
 * TODO: or Place API: Place Search (https://developers.google.com/maps/documentation/places/web-service/search)
 *
 * @param {Props} { google, map }
 * @return {*}
 */
const AttrFinder = ({ google, map }: Props) => {

  const service = useRef<google.maps.places.PlacesService>()

  const { register, handleSubmit } = useForm<Inputs>();
  const onSearch: SubmitHandler<Inputs> = data => {
    console.log(data);
    if(service.current){
      service.current.findPlaceFromQuery({ query: data.search, fields: request.fields}, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK)
          return console.error(status)
        console.log(results)
      })
    }
  }

  const request = {
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    fields: ["name", "formatted_address", "place_id", "geometry"],
  };

  useEffect(() => {
    service.current = new google.maps.places.PlacesService(map.current);
  }, [])

  return (
    <div className="absolute z-10 inset-y-2 left-2 w-1/4 rounded shadow-md bg-white">

      
      <div className="px-1 py-1">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                {...register("search")}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md border border-r-0 border-gray-300"
                placeholder="Search"
              />
              <button onClick={handleSubmit(onSearch)} className="inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
                <SearchIcon className="w-6"/>
              </button>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  )

};

export default AttrFinder
