import { Grid } from '@mui/material';
import EditableTable from 'sections/tables/react-table/editable';

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTablePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <EditableTable
        data={[
          { id: 1, fullName: 'John Doe', email: 'john.doe@example.com', age: 30, visits: 10, progress: 50 },
          { id: 2, fullName: 'Rose Mary', email: 'rose.mary@example.com', age: 40, visits: 5, progress: 80 },
        ]}
      />
    </Grid>
  </Grid>
);

export default EditableTablePage;
