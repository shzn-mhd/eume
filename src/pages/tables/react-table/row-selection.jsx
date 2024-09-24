// material-ui
import { Grid } from '@mui/material';

// project import
import RowSelectionTable from 'sections/tables/react-table/RowSelectionTable';
import RSPControl from 'sections/tables/react-table/RSPControl';

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const RowSelection = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <RowSelectionTable />
    </Grid>
    <Grid item xs={12}>
      <RSPControl />
    </Grid>
  </Grid>
);

export default RowSelection;
