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
  const [lighthouses, setLighthouses] = useState([[]])
  useEffect(() => {
    if (map.current) return; // initialize map only once
    const newMap = new mapboxgl.Map({ // @ts-ignore
      container: mapContainer.current, // @ts-ignore
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current = newMap
    newMap.on('style.load', () => {
        newMap.addSource("myImageSource", {"type": "image",
      "url": "http://127.0.0.1:8000/sar_image",
       "coordinates": [
         [22.2908182629724, 59.91614254645401],
         [22.578806773313246, 59.947751078236365],
         [22.638044070378744, 59.809992490984754],
         [22.351391574531174, 59.77847599974091],
       ]})
       newMap.addLayer({
        "id": "overlay",
        "source": "myImageSource",
        "type": "raster",
        "paint": {"raster-opacity": 0.85}
      })

      // FIXME: the markers are not showing up yet
      const ship = new mapboxgl.Marker()
        .setLngLat([59.89134, 22.30606])
        .addTo(newMap);

    })
  });

  useEffect(() => {
    (async () => {
        const response = await fetch('http://localhost:8000/lighthouses')
        const lighthouseLocations = JSON.parse(await response.text())
        setLighthouses(lighthouseLocations)
        console.log(lighthouseLocations)
    })()
  }, [])

  useEffect(() => {
    if (map.current?.isStyleLoaded()) {
      for (const lighthouse of lighthouses) {
        // FIXME: the markers are not showing up yet
        const marker = new mapboxgl.Marker()
          .setLngLat([lighthouse[0], lighthouse[1]])
          .addTo(map.current);
      }
    } else {
        // TODO: handle loading lighthouses when lighthouse response arrives before map style is ready
    }
  }, [lighthouses])


  return (
    <div>
      <h2>Odin</h2>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}

