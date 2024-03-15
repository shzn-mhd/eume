import PropTypes from 'prop-types';
import { useRef, useState, useCallback, memo } from 'react';

// third-party
import Map from 'react-map-gl';

// project-import
import ControlPanel from './control-panel';
import MapControl from 'components/third-party/map/MapControl';

// ==============================|| MAP - VIEWPORT ANIMATION ||============================== //

function ViewportAnimation({ data, ...other }) {
  const mapRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState(data[2].city);

  const onSelectCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: 22.299405,
        longitude: 73.208119,
        zoom: 11,
        bearing: 0,
        pitch: 0
      }}
      ref={mapRef}
      {...other}
    >
      <MapControl />
      <ControlPanel data={data} selectedCity={selectedCity} onSelectCity={onSelectCity} />
    </Map>
  );
}

ViewportAnimation.propTypes = {
  data: PropTypes.array,
  city: PropTypes.string
};

export default memo(ViewportAnimation);
