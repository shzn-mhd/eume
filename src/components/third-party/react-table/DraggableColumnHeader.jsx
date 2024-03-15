import PropTypes from 'prop-types';

// material-ui
import { Box, TableCell } from '@mui/material';

// third-party
import { useDrag, useDrop } from 'react-dnd';

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]);
  return [...columnOrder];
};

// ==============================|| DRAGGABLE COLUMN ||============================== //

const DraggableColumnHeader = ({ header, table, children }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: () => column,
    type: 'column'
  });

  return (
    <TableCell ref={dropRef} colSpan={header.colSpan} sx={{ cursor: 'move' }} {...header.column.columnDef.meta}>
      <Box component="span" ref={previewRef}>
        <Box ref={dragRef} sx={{ color: isOverCurrent ? 'primary.main' : 'text.primary', opacity: isDragging ? 0.9 : 1 }}>
          {children}
        </Box>
      </Box>
    </TableCell>
  );
};

DraggableColumnHeader.propTypes = {
  header: PropTypes.object,
  table: PropTypes.object,
  children: PropTypes.node,
  getState: PropTypes.func,
  setColumnOrder: PropTypes.func,
  column: PropTypes.array,
  id: PropTypes.number,
  colSpan: PropTypes.number,
  columnDef: PropTypes.array,
  meta: PropTypes.string
};

export default DraggableColumnHeader;
