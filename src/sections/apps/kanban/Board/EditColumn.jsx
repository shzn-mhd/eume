import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

// project imports
import { ThemeMode } from 'config';
import { editColumn } from 'api/kanban';

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

const EditColumn = ({ column }) => {
  const theme = useTheme();

  const handleColumnRename = (event) => {
    editColumn({ id: column.id, title: event.target.value, itemIds: column.itemIds });
  };

  return (
    <OutlinedInput
      fullWidth
      value={column.title}
      onChange={handleColumnRename}
      sx={{
        mb: 1.5,
        fontWeight: 500,
        '& input:focus': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.grey[50]
        },
        '& input:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.grey[50]
        },
        '& input:hover + fieldset': {
          display: 'block'
        },
        '&, & input': { bgcolor: 'transparent' },
        '& fieldset': { display: 'none' },
        '& input:focus + fieldset': { display: 'block' }
      }}
    />
  );
};

EditColumn.propTypes = {
  column: PropTypes.object
};

export default EditColumn;
