
import React, { useState, useEffect, useRef } from 'react';

function MapPage({ slopes, userLocation }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 45.9432, lng: 24.9668 }, // Default to Romania
        zoom: 7,
      });
      setMap(googleMap);
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map) {
      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: { lat: userLocation.latitude, lng: userLocation.longitude },
          map: map,
          title: 'Your Location',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white"
          }
        });
        markersRef.current.push(userMarker); // Store marker reference
        map.setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
        map.setZoom(8);
      }

      slopes.forEach(slope => {
        const slopeMarker = new window.google.maps.Marker({
          position: { lat: slope.latitude, lng: slope.longitude },
          map: map,
          title: slope.name,
          label: {
            text: slope.name,
            className: 'slope-map-label'
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: "#FF0000",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "white",
            labelOrigin: new window.google.maps.Point(0, -10)
          }
        });

        slopeMarker.addListener('click', () => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${slope.latitude},${slope.longitude}`, '_blank');
        });
        markersRef.current.push(slopeMarker);
      });
    }
  }, [map, slopes, userLocation]);

  return (
    <div style={{ height: 'calc(100vh - 114px)', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default MapPage;
