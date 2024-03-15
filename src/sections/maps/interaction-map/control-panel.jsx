import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { styled, alpha } from '@mui/material/styles';
import { Box, InputBase, Switch, Typography } from '@mui/material';

// project-import
import ControlPanelStyled from 'components/third-party/map/ControlPanelStyled';

const RowStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(1)
  }
}));

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name) {
  return name.match(camelPattern)?.join(' ');
}

// ==============================|| CONTROL - INTERATION MAP ||============================== //

function ControlPanel({ settings, onChange }) {
  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return (
          <RowStyled key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <Switch size="small" checked={value} onChange={(event) => onChange(name, event.target.checked)} />
          </RowStyled>
        );
      case 'number':
        return (
          <RowStyled key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <InputBase
              value={value}
              onChange={(event) => onChange(name, Number(event.target.value))}
              inputProps={{ type: 'number' }}
              sx={{
                '& input': {
                  py: 0.25,
                  width: 40,
                  fontSize: 14,
                  borderRadius: 1,
                  textAlign: 'center',
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
                }
              }}
            />
          </RowStyled>
        );
      default:
        return null;
    }
  };

  return <ControlPanelStyled>{Object.keys(settings).map((name) => renderSetting(name, settings[name]))}</ControlPanelStyled>;
}

ControlPanel.propTypes = {
  settings: PropTypes.object,
  onChange: PropTypes.func
};

export default memo(ControlPanel);
