import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

// project-import
import ControlPanelStyled from 'components/third-party/map/ControlPanelStyled';

// ==============================|| SIDE BY SIDE - CONTROL ||============================== //

const ControlPanel = ({ mode, onModeChange }) => {
  return (
    <ControlPanelStyled>
      <ToggleButtonGroup value={mode} exclusive onChange={onModeChange}>
        <ToggleButton value="side-by-side">Side by side</ToggleButton>
        <ToggleButton value="split-screen">Split screen</ToggleButton>
      </ToggleButtonGroup>
    </ControlPanelStyled>
  );
};

ControlPanel.propTypes = {
  mode: PropTypes.string,
  onModeChange: PropTypes.func
};

export default memo(ControlPanel);
