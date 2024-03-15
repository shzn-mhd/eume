// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';

import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import {
  ColorVariants,
  CustomComponent,
  Dense,
  DismissSnackBar,
  HideDuration,
  IconVariants,
  MaxSnackbar,
  PositioningSnackbar,
  PreventDuplicate,
  SnackBarAction,
  TransitionBar
} from 'sections/components-overview/notistack';

import { openSnackbar } from 'api/snackbar';

// ==============================|| COMPONENTS - SNACKBAR ||============================== //

const ComponentSnackbar = () => {
  const basicSnackbarCodeString = `<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is default message',
      variant: 'alert',
    });
  }
>
  Default
</Button>
<Button
  variant="contained"
  color="secondary"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is secondary message',
      variant: 'alert',
      alert: { color: 'secondary' },
    });
  }
>
  Secondary
</Button>
<Button
  variant="contained"
  color="success"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is success message',
      variant: 'alert',
      alert: {
        color: 'success'
      },
    });
  }
>
  Success
</Button>
<Button
  variant="contained"
  color="warning"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is warning message',
      variant: 'alert',
      alert: {
        color: 'warning'
      },
    });
  }
>
  Warning
</Button>
<Button
  variant="contained"
  color="info"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is info message',
      variant: 'alert',
      alert: {
        color: 'info'
      },
    });
  }
>
  Info
</Button>
<Button
  variant="contained"
  color="error"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is error message',
      variant: 'alert',
      alert: {
        color: 'error'
      },
    });
  }
>
  Error
</Button>`;

  const outlinedSnackbarCodeString = `<Button
  variant="outlined"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is default message',
      variant: 'alert',
      alert: {
        variant: 'outlined'
      },
    });
  }
>
  Default
</Button>
<Button
  variant="outlined"
  color="secondary"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is secondary message',
      variant: 'alert',
      alert: {
        variant: 'outlined',
        color: 'secondary'
      },
    });
  }
>
  Secondary
</Button>
<Button
  variant="outlined"
  color="success"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is success message',
      variant: 'alert',
      alert: {
        variant: 'outlined',
        color: 'success'
      },
    });
  }
>
  Success
</Button>
<Button
  variant="outlined"
  color="warning"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is warning message',
      variant: 'alert',
      alert: {
        variant: 'outlined',
        color: 'warning'
      },
    });
  }
>
  Warning
</Button>
<Button
  variant="outlined"
  color="info"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is info message',
      variant: 'alert',
      alert: {
        variant: 'outlined',
        color: 'info'
      },
    });
  }
>
  Info
</Button>
<Button
  variant="outlined"
  color="error"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is error message',
      variant: 'alert',
      alert: {
        variant: 'outlined',
        color: 'error'
      },
    });
  }
>
  Error
</Button>`;

  const closeSnackbarCodeString = `<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is default message',
      variant: 'alert',
      close: true
    });
  }
>
  Default
</Button>
<Button
  variant="contained"
  color="secondary"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is secondary message',
      variant: 'alert',
      alert: { color: 'secondary' },
      close: true
    });
  }
>
  Secondary
</Button>
<Button
  variant="contained"
  color="success"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is success message',
      variant: 'alert',
      alert: {
        color: 'success'
      },
      close: true
    });
  }
>
  Success
</Button>
<Button
  variant="contained"
  color="warning"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is warning message',
      variant: 'alert',
      alert: {
        color: 'warning'
      },
      close: true
    });
  }
>
  Warning
</Button>
<Button
  variant="contained"
  color="info"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is info message',
      variant: 'alert',
      alert: {
        color: 'info'
      },
      close: true
    });
  }
>
  Info
</Button>
<Button
  variant="contained"
  color="error"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is error message',
      variant: 'alert',
      alert: {
        color: 'error'
      },
      close: true
    });
  }
>
  Error
</Button>`;

  const actionSnackbarCodeString = `<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is default message',
      variant: 'alert',
      actionButton: true,
      close: true
    });
  }
>
  Default
</Button>
<Button
  variant="contained"
  color="secondary"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is secondary message',
      variant: 'alert',
      alert: { color: 'secondary' },
      actionButton: true,
      close: true
    });
  }
>
  Secondary
</Button>
<Button
  variant="contained"
  color="success"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is success message',
      variant: 'alert',
      alert: {
        color: 'success'
      },
      actionButton: true,
      close: true
    });
  }
>
  Success
</Button>
<Button
  variant="contained"
  color="warning"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is warning message',
      variant: 'alert',
      alert: {
        color: 'warning'
      },
      actionButton: true,
      close: true
    });
  }
>
  Warning
</Button>
<Button
  variant="contained"
  color="info"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is info message',
      variant: 'alert',
      alert: {
        color: 'info'
      },
      actionButton: true,
      close: true
    });
  }
>
  Info
</Button>
<Button
  variant="contained"
  color="error"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is error message',
      variant: 'alert',
      alert: {
        color: 'error'
      },
      actionButton: true,
      close: true
    });
  }
>
  Error
</Button>`;

  const positionSnackbarCodeString = `<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'top', horizontal: 'left' },
      message: 'This is an top-left message!',
      close: true
    });
  }
>
  Top-Left
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      message: 'This is an top-center message!',
      close: true
    });
  }
>
  Top-Center
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      message: 'This is an top-right message!',
      close: true
    });
  }
>
  Top-Right
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      message: 'This is an bottom-right message!',
      close: true
    });
  }
>
  Bottom-Right
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      message: 'This is an bottom-center message!',
      close: true
    });
  }
>
  Bottom-Center
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      message: 'This is an bottom-left message!',
      close: true
    });
  }
>
  Bottom-Left
</Button>`;

  const transitionsSnackbarCodeString = `<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an fade message!',
      transition: 'Fade',
      close: true
    });
  }
>
  Default/Fade
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an slide-left message!',
      transition: 'SlideLeft',
      close: true
    });
  }
>
  Slide Left
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an slide-up message!',
      transition: 'SlideUp',
      close: true
    });
  }
>
  Slide Up
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an slide-right message!',
      transition: 'SlideRight',
      close: true
    });
  }
>
  Slide Right
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an slide-down message!',
      transition: 'SlideDown',
      close: true
    });
  }
>
  Slide Down
</Button>
<Button
  variant="contained"
  onClick={() =>
    openSnackbar({
      open: true,
      message: 'This is an grow message!',
      transition: 'Grow',
      close: true
    });
  }
>
  Grow
</Button>`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Snackbar"
        caption="Snackbars provide brief notifications. The component is also known as a toast."
        directory="src/pages/components-overview/snackbar"
        link="https://mui.com/material-ui/react-snackbar/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MainCard title="Basic" codeString={basicSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert'
                      })
                    }
                  >
                    Default
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is secondary message',
                        variant: 'alert',
                        alert: { color: 'secondary' }
                      })
                    }
                  >
                    Secondary
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        }
                      })
                    }
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          color: 'warning'
                        }
                      })
                    }
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is info message',
                        variant: 'alert',
                        alert: {
                          color: 'info'
                        }
                      })
                    }
                  >
                    Info
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          color: 'error'
                        }
                      })
                    }
                  >
                    Error
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Outlined" codeString={outlinedSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined'
                        }
                      })
                    }
                  >
                    Default
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is secondary message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'secondary'
                        }
                      })
                    }
                  >
                    Secondary
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'success'
                        }
                      })
                    }
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'warning'
                        }
                      })
                    }
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is info message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'info'
                        }
                      })
                    }
                  >
                    Info
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'error'
                        }
                      })
                    }
                  >
                    Error
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="With Close" codeString={closeSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert',
                        close: true
                      })
                    }
                  >
                    Default
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is secondary message',
                        variant: 'alert',
                        alert: {
                          color: 'secondary'
                        },
                        close: true
                      })
                    }
                  >
                    Secondary
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: true
                      })
                    }
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          color: 'warning'
                        },
                        close: true
                      })
                    }
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is info message',
                        variant: 'alert',
                        alert: {
                          color: 'info'
                        },
                        close: true
                      })
                    }
                  >
                    Info
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          color: 'error'
                        },
                        close: true
                      })
                    }
                  >
                    Error
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="With Close + Action" codeString={actionSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Default
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is secondary message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'secondary'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Secondary
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'success'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'warning'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is info message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'info'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Info
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          variant: 'outlined',
                          color: 'error'
                        },
                        actionButton: true,
                        close: true
                      })
                    }
                  >
                    Error
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Position" codeString={positionSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'left' },
                        message: 'This is an top-left message!',
                        close: true
                      })
                    }
                  >
                    Top-Left
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'This is an top-center message!',
                        close: true
                      })
                    }
                  >
                    Top-Center
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        message: 'This is an top-right message!',
                        close: true
                      })
                    }
                  >
                    Top-Right
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                        message: 'This is an bottom-right message!',
                        close: true
                      })
                    }
                  >
                    Bottom-Right
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                        message: 'This is an bottom-center message!',
                        close: true
                      })
                    }
                  >
                    Bottom-Center
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        message: 'This is an bottom-left message!',
                        close: true
                      })
                    }
                  >
                    Bottom-Left
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Transitions" codeString={transitionsSnackbarCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an fade message!',
                        transition: 'Fade',
                        close: true
                      })
                    }
                  >
                    Default/Fade
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-left message!',
                        transition: 'SlideLeft',
                        close: true
                      })
                    }
                  >
                    Slide Left
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-up message!',
                        transition: 'SlideUp',
                        close: true
                      })
                    }
                  >
                    Slide Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-right message!',
                        transition: 'SlideRight',
                        close: true
                      })
                    }
                  >
                    Slide Right
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-down message!',
                        transition: 'SlideDown',
                        close: true
                      })
                    }
                  >
                    Slide Down
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      openSnackbar({
                        open: true,
                        message: 'This is an grow message!',
                        transition: 'Grow',
                        close: true
                      })
                    }
                  >
                    Grow
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Extended - Notistack
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <ColorVariants />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MaxSnackbar />
          </Grid>
          <Grid item xs={12} lg={6}>
            <IconVariants />
          </Grid>
          <Grid item xs={12} lg={6}>
            <HideDuration />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SnackBarAction />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DismissSnackBar />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PreventDuplicate />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TransitionBar />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Dense />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomComponent />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PositioningSnackbar />
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
};

export default ComponentSnackbar;
