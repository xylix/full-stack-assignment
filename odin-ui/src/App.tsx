import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // @ts-ignore eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3BlbHR0YXJpIiwiYSI6ImNsaWhrb21lZTBxNjUzZG53MWhzYXVtNTQifQ.CvzsjFfO4BMZ9JgDEI4Zdg';


export const App = (): JSX.Element => {
  const mapContainer: React.RefObject<HTMLDivElement>= useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(22.4673);
  const [lat, setLat] = useState(59.8613);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({ // @ts-ignore
      container: mapContainer.current, // @ts-ignore
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });
  return (
    <div>
      <h2>Odin</h2>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}

