// material-ui
import { Grid } from '@mui/material';
import { useState } from 'react';

// project import
import EditableRow from 'sections/tables/react-table/EditableRow';

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = () => {
  // Define state variables to hold table data and editing state
  const [rowData, setRowData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle editing of a row
  const handleEditRow = (id) => {
    setIsEditing(id);
  };

  // Function to handle updating of row data
  const handleUpdateRow = (id, newData) => {
    const updatedData = rowData.map((row) =>
      row.id === id ? { ...row, ...newData } : row
    );
    setRowData(updatedData);
    setIsEditing(false);
  };

  return (
    <Grid container spacing={3}>
      {rowData.map((row) => (
        <Grid item xs={12} key={row.id}>
          <EditableRow
            row={row}
            isEditing={isEditing === row.id}
            onEdit={() => handleEditRow(row.id)}
            onUpdate={(newData) => handleUpdateRow(row.id, newData)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EditableTable;
