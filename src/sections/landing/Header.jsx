import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// assets
import { EyeOutlined } from '@ant-design/icons';
import headertechimg from 'assets/images/landing/img-headertech.svg';
// import headerbg from 'assets/images/landing/bg-mokeup.svg';
// import headeravtar from 'assets/images/landing/img-headeravtar.png';
// import headerwidget1 from 'assets/images/landing/img-headerwidget1.png';
// import headerwidget2 from 'assets/images/landing/img-headerwidget2.png';
// import headerwidget3 from 'assets/images/landing/img-headerwidget3.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} lg={5} md={6}>
          <Grid container spacing={2} sx={{ pr: 10, [theme.breakpoints.down('md')]: { pr: 0, textAlign: 'center' } }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  color="white"
                  sx={{
                    fontSize: { xs: '1.825rem', sm: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    lineHeight: { xs: 1.3, sm: 1.3, md: 1.3 }
                  }}
                >
                  <span>Carefully Crafted for your </span>
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                    <span>Caring React </span>
                  </Box>
                  <span>Project</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 400,
                    lineHeight: { xs: 1.4, md: 1.4 }
                  }}
                >
                  Mantis is a blazing-fast React dashboard template built using the Material-UI React library.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sx={{ my: 3.25 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} to="/components-overview/buttons" size="large" color="primary" variant="outlined">
                        Explore Components
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        component={Link}
                        href="/login"
                        target="_blank"
                        size="large"
                        color="primary"
                        variant="contained"
                        startIcon={<EyeOutlined style={{ fontSize: '1.15rem' }} />}
                      >
                        Live Preview
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6
                }}
              >
                <img src={headertechimg} alt="Mantis" style={{ zIndex: 9 }} />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* <Box sx={{ position: 'relative', mt: 8.75 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 30,
                                delay: 0
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={headerbg}
                                sx={{ position: 'absolute', width: { xs: '100%', lg: '115%' }, left: '-8%', top: '-28%', zIndex: 1 }}
                            />
                        </motion.div>
                        <Grid container spacing={2} sx={{ position: 'relative', zIndex: 2 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ alignItems: 'flex-end' }}>
                                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.2
                                            }}
                                        >
                                            <CardMedia component="img" image={headeravtar} sx={{ width: 'auto', m: '0 auto' }} />
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.4
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget1} />
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.6
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget3} />
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.8
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget2} />
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
