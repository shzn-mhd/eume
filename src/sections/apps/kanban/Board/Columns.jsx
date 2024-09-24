import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

// third-party
import { Droppable, Draggable } from '@hello-pangea/dnd';

// project imports
import EditColumn from './EditColumn';
import Items from './Items';
import AddItem from './AddItem';
import AlertColumnDelete from './AlertColumnDelete';
import IconButton from 'components/@extended/IconButton';

import { ThemeMode } from 'config';
import { deleteColumn, useGetBacklogs } from 'api/kanban';
import { openSnackbar } from 'api/snackbar';

// assets
import { DeleteOutlined } from '@ant-design/icons';

// column drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => {
  // const bgcolor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.primary.lighter;
  return {
    minWidth: 250,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: radius,
    userSelect: 'none',
    margin: `0 ${16}px 0 0`,
    height: '100%',
    ...draggableStyle
  };
};

// column drop wrapper
const getDropWrapper = (isDraggingOver, theme, radius) => {
  const bgcolor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.secondary.lighter;
  const bgcolorDrop = theme.palette.mode === ThemeMode.DARK ? theme.palette.text.disabled : theme.palette.secondary.light + 65;

  return {
    background: isDraggingOver ? bgcolorDrop : bgcolor,
    padding: '8px 16px 14px',
    width: 'auto',
    borderRadius: radius
  };
};

// ==============================|| KANBAN BOARD - COLUMN ||============================== //

const Columns = ({ column, index }) => {
  const theme = useTheme();

  const { backlogs } = useGetBacklogs();
  const columnItems = column.itemIds.map((itemId) => backlogs?.items.filter((item) => item.id === itemId)[0]);

  const handleColumnDelete = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const handleClose = (status) => {
    setOpen(false);
    if (status) {
      deleteColumn(column.id);
      openSnackbar({
        open: true,
        message: 'Column deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `4px`)}
        >
          <Droppable droppableId={column.id} type="item">
            {(providedDrop, snapshotDrop) => (
              <div
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
                style={getDropWrapper(snapshotDrop.isDraggingOver, theme, `4px`)}
              >
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs zeroMinWidth>
                    <EditColumn column={column} />
                  </Grid>
                  <Grid item sx={{ mb: 1.5 }}>
                    <Tooltip title="Delete Column">
                      <IconButton onClick={handleColumnDelete} aria-controls="menu-simple-card" aria-haspopup="true" color="error">
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                    <AlertColumnDelete title={column.title} open={open} handleClose={handleClose} />
                  </Grid>
                </Grid>
                {columnItems.map((item, i) => (
                  <Items key={i} item={item} index={i} />
                ))}
                {providedDrop.placeholder}
                <AddItem columnId={column.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

Columns.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number
};

export default Columns;
