// material-ul
import { Button, Stack } from '@mui/material';

// third-path
import { enqueueSnackbar, useSnackbar } from 'notistack';

// project import
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - ACTION BUTTONS ||============================== //

export default function SnackBarAction() {
  const { closeSnackbar } = useSnackbar();
  const actionTask = (snackbarId) => (
    <Stack direction="row" spacing={0.5}>
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={() => {
          alert(`I belong to snackbar with id ${snackbarId}`);
        }}
      >
        Undo
      </Button>
      <Button size="small" color="secondary" variant="contained" onClick={() => closeSnackbar(snackbarId)}>
        Dismiss
      </Button>
    </Stack>
  );

  const NotistackActionCodeString = `const actionTask = (snackbarId: SnackbarKey) => (
  <>
    <Button
      variant="text"
      onClick={() => {
        alert("I belong to snackbar with id {snackbarId}");
      }}
    >
      Undo
    </Button>
    <Button variant="text" onClick={() => closeSnackbar(snackbarId)}>
      Dismiss
    </Button>
  </>
);
<Button variant="outlined" onClick={() =>enqueueSnackbar('Your notification here', { action: (key) => actionTask(key) })}>
 Show Snackbar
</Button>`;

  return (
    <MainCard title="With Action" codeString={NotistackActionCodeString}>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => enqueueSnackbar('Your notification here', { action: (key) => actionTask(key) })}
      >
        Show Snackbar
      </Button>
    </MainCard>
  );
}
