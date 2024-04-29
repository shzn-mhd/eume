import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditableCell from './EditableCell';

const EditableRow = ({ row, isEditing, onEdit, onUpdate }) => {
  const [rowData, setRowData] = useState(row);

  const handleChange = (name, value) => {
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(rowData);
  };

  return (
    <TableRow>
      <TableCell>
        <EditableCell
          value={rowData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      {/* Add additional cells here if needed */}
      <TableCell>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={onEdit}>Edit</button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
