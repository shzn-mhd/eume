import PropTypes from 'prop-types';
import { useState, useCallback, memo } from 'react';

// third-party
import Map from 'react-map-gl';

// project-imports
import ControlPanel from './control-panel';
import MapControl from 'components/third-party/map/MapControl';

// ==============================|| MAPBOX - THEME ||============================== //

const ChangeTheme = ({ themes, ...other }) => {
  const [selectTheme, setSelectTheme] = useState('streets');
  const handleChangeTheme = useCallback((value) => setSelectTheme(value), []);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 21.2335611,
          longitude: 72.8636084,
          zoom: 6,
          bearing: 0,
          pitch: 0
        }}
        mapStyle={themes?.[selectTheme]}
        {...other}
      >
        <MapControl />
      </Map>

      <ControlPanel themes={themes} selectTheme={selectTheme} onChangeTheme={handleChangeTheme} />
    </>
  );
};

ChangeTheme.propTypes = {
  themes: PropTypes.object
};

export default memo(ChangeTheme);
