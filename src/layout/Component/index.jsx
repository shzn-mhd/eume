import { lazy, Suspense } from 'react';

// material-ui
import { Container, Toolbar } from '@mui/material';

// project import
import Loader from 'components/Loader';
import ComponentLayoutPage from './ComponentLayout';
import { useGetMenuMaster } from 'api/menu';

const Header = lazy(() => import('./Header'));

// ==============================|| MINIMAL LAYOUT ||============================== //

const ComponentLayout = () => {
  const { menuMasterLoading } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Header />
        <Toolbar sx={{ my: 2 }} />
        <ComponentLayoutPage />
      </Container>
    </Suspense>
  );
};

export default ComponentLayout;
