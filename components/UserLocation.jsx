export default function UserLocation({ geoData }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Coordinates
  const {
    timestamp,
    coords: {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude: lat,
      longitude: lng,
      speed,
    },
  } = geoData;

  return (
    <section>
      <h2>Ihr Standort</h2>
      <dl>
        <dt>Längengrad</dt>
        <dd>{lng || 'Nicht verfügbar'}</dd>
        <dt>Breitengrad</dt>
        <dd>{lat || 'Nicht verfügbar'}</dd>
        <dt>Positionsgenauigkeit</dt>
        <dd>{accuracy || 'Nicht verfügbar'}</dd>
        <dt>Höhe</dt>
        <dd>{altitude || 'Nicht verfügbar'}</dd>
        <dt>Höhengenauigkeit</dt>
        <dd>{altitudeAccuracy || 'Nicht verfügbar'}</dd>
        <dt>Geschwindigkeit</dt>
        <dd>{speed || 'Nicht verfügbar'}</dd>
        <dt>Richtung</dt>
        <dd>{heading || 'Nicht verfügbar'}</dd>
        <dt>Zeitstempel</dt>
        <dd>{timestamp || 'Nicht verfügbar'}</dd>
      </dl>
    </section>
  );
}
