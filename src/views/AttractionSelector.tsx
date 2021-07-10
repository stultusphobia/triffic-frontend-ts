import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Header from '../components/Header'
import Map from '../components/Map'

const AttractionSelector = () => {

  return (
    <React.Fragment>
      <Header title="Attraction Selector" />
      <main className="flex-grow">
        <Map />
      </main>
    </React.Fragment>
  );
};

export default AttractionSelector
