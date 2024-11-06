import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// material-ui
import { Checkbox, FormControl, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};


// ==============================|| COLUMN SORTING - SELECT ||============================== //

const SelectColumnSorting = ({ setSortValue, getState, getAllColumns, setSorting, size = 'medium' }) => {
  const { t, i18n } = useTranslation();

  const handleSortChange = (columnId) => {
    // Prevent deselection by maintaining the sort state
    const newSorting = getState().sorting.length > 0 && columnId === getState().sorting[0].id 
      ? [{ id: columnId, desc: !getState().sorting[0].desc }] 
      : [{ id: columnId, desc: false }];
    
    setSorting(newSorting);
    setSortValue(columnId);
  };

  return (
  <FormControl sx={{ width: 200 }}>
    <Select
      id="column-sorting"
      multiple
      displayEmpty
      value={getState().sorting.length > 0 ? getState().sorting : []}
      input={<OutlinedInput id="select-column-sorting" placeholder="select column" />}
      renderValue={(selected) => {
        const selectedColumn = getAllColumns().find((column) => 
          selected.length > 0 && column.id === selected[0].id
        );
        
        if (selectedColumn) {
          return (
            <Typography variant="subtitle2">
              {t('Sort by')} ({typeof selectedColumn.columnDef.header === 'string' ? selectedColumn.columnDef.header : '#'})
            </Typography>
          );
        }
        return <Typography variant="subtitle2">{t('Sort By')}</Typography>;
      }}
      MenuProps={MenuProps}
      size={size}
    >
      {getAllColumns().map(
          (column) =>
            column.columnDef.header !== t("Permissions - Basic Survey") &&
            column.columnDef.header !== t("Permissions - Optional Survey") &&
            column.columnDef.header !== t("Permissions - Users") &&
            column.columnDef.header !== t("Permissions - Roles	") &&
            column.columnDef.header !== t("Export data") &&
            column.columnDef.header !== t("Import data") &&
            column.columnDef.accessorKey &&
            column.getCanSort() && (
              <MenuItem
                key={column.id}
                value={column.id}
                onClick={() => handleSortChange(column.id)}
              >
                <Checkbox 
                  checked={getState().sorting.length > 0 && column.id === getState().sorting[0].id} 
                  color="success" 
                />
                <ListItemText primary={column.columnDef.header} />
              </MenuItem>
            )
        )}
    </Select>
  </FormControl>
);

}

SelectColumnSorting.propTypes = {
  getState: PropTypes.func,
  getAllColumns: PropTypes.func,
  setSorting: PropTypes.func,
  size: PropTypes.string
};

export default SelectColumnSorting;
