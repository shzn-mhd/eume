import { Grid } from '@mui/material';
// import EditableTable from 'sections/tables/react-table/EditableTable';
import EditableTable from './EditableTable';
import { db } from 'config/firebase';

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTablePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <EditableTable
        data={[
          { id: 1, fullName: 'John Doe', email: 'john.doe@example.com', age: 30, visits: 10, progress: 50 },
          { id: 2, fullName: 'Rose Mary', email: 'rose.mary@example.com', age: 40, visits: 5, progress: 80 },
          { id: 3, fullName: 'Jack Daniels', email: 'jack.dani@example.com', age: 50, visits: 8, progress: 95 },
        ]}
      />
    </Grid>
  </Grid>
);

export default EditableTablePage;
