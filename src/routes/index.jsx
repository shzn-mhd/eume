import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ComponentsRoutes from './ComponentsRoutes';

import SimpleLayout from 'layout/Simple';
import Loadable from 'components/Loadable';

import { SimpleLayoutType } from 'config';
import MainLayout from 'layout/MainLayout';
import DashboardLayout from 'layout/Dashboard';
// import DashboardDefault from 'pages/dashboard/default';

// render - landing page
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const PagesLanding = Loadable(lazy(() => import('pages/landing'))); 
const EditableTableListPage = Loadable(
  lazy(() => import("pages/eume/EditableTablePage"))
);
const AppCustomerCard = Loadable(
  lazy(() => import("pages/apps/customer/card"))
);

const MainPage = Loadable(
  lazy(() => import("layout/MainLayout")) 
);
// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:<DashboardLayout /> ,
      // element: <SimpleLayout layout={SimpleLayoutType.LANDING} />,
      children: [
        {
          index: true, // This sets the default route
          element: <DashboardDefault />,
          // path: '/dashboard/default'
        },
        {
          path: 'dashboard/default',
          element: <DashboardDefault />,
        },
      ]
    },
    // {
    //   path: "/",
    //   children: [
    //     {
    //       index: true,
    //       path: "EditableTablePage",
    //       element: <EditableTableListPage />,
    //     },
    //     {
    //       path: "university-card",
    //       element: <AppCustomerCard />,
    //     },
    //   ],
    // },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
