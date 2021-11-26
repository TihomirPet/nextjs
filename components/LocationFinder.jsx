import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import cimdataLocations from '@/library/cimdataLocations';
import { useState, useEffect } from 'react';
import UserLocation from './UserLocation';
import { getDistance } from '@/library/helpers';

const defaultCenter = { lat: 51.1864708, lng: 10.0671016 };
const defaultZoom = 6;
const myPosition = { lat: 52.50119, lng: 13.41626 };
export default function LocationFinder() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [locations, setLocations] = useState(cimdataLocations);

  // Prüfen, ob das Gerät Geolocation unterstützt
  const navigatorAvailable = Boolean(window?.navigator?.geolocation);

  async function showNearLocations() {
    try {
      const location = await getUserLocation();

      const userCenter = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      const locationsInRadius = getLocationsInRadius(userCenter);

      setLocations(locationsInRadius);

      setUserLocation(location);
      setMapCenter(userCenter);
      setZoom(11);
    } catch (error) {
      // https://developer.mozilla.org/en-US/docs/Web/API/PositionError
      console.log(error);
    }
  }

  const resetMap = () => {
    setLocations(cimdataLocations);
    setMapCenter(defaultCenter);
    setZoom(defaultZoom);
    setUserLocation(null);
  };

  return (
    <section>
      {navigatorAvailable && (
        <button onClick={showNearLocations}>
          Zeige Standorte in meiner Nähe
        </button>
      )}
      <button onClick={resetMap}>Alle Standorte anzeigen</button>
      {/* Die Props von MapContainer werden nur beim ersten Rendern der Karte
        berücksichtig, spätere Änderungen haben keine Auswirkung! */}
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false}>
        {/* MapController hat Zugriff auf die Leaflet-Karte, Änderungen bei
          den Props haben Auswirkungen. */}
        <MapController center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup>
          {locations.map(({ title, latLng }) => (
            <Marker key={title} position={latLng}>
              {' '}
              <Popup>
                <strong>{title}</strong>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {userLocation && (
          <Marker
            position={{
              lat: userLocation.coords.latitude,
              lng: userLocation.coords.longitude,
            }}>
            <Popup>
              <strong>Jonathan</strong>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {userLocation && <UserLocation geoData={userLocation} />}
    </section>
  );
}

function MapController({ center, zoom }) {
  /* map enthält die Leaflet-Instanz. */
  const map = useMap();

  /* Hier werden Methoden der Leaflet-Bibliothek verwendet, ganz unabhängig
      von React!
      https://leafletjs.com/reference-1.7.1.html#map-methods-for-modifying-map-state
      */
  useEffect(() => map.setView(center, zoom), [center, zoom, map]);

  return null;
}

function getUserLocation() {
  // https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  /* Die ältere geolocation-API basiert auf Callback-Funktionen statt
    Promises. Hier wird sie in ein Promise verpackt, um sie in asynchronen
    Funktionen nutzen zu können. */
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function getLocationsInRadius(center, radius = 10) {
  const locationsInRadius = cimdataLocations.filter(({ latLng }) => {
    const distance = getDistance(
      latLng.lat,
      latLng.lng,
      center.lat,
      center.lng
    );

    return distance <= radius;
  });

  return locationsInRadius;
}
