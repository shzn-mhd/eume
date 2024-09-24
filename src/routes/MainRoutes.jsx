import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";
import PagesLayout from "layout/Pages";
import SimpleLayout from "layout/Simple";
import { SimpleLayoutType } from "config";

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import("pages/dashboard/default"))
);
const DashboardAnalytics = Loadable(
  lazy(() => import("pages/dashboard/analytics"))
);

const AppCustomerList = Loadable(
  lazy(() => import("pages/apps/customer/list"))
);
const AppCustomerCard = Loadable(
  lazy(() => import("pages/apps/customer/card"))
);

const SystemAdminListPage = Loadable(
  lazy(() => import("pages/system-admin/admin"))
);

const EditableTableListPage = Loadable(
  lazy(() => import("pages/eume/EditableTablePage"))
);

const OptionalSurveyListPage = Loadable(
  lazy(() => import("pages/optional-survey/EditableTablePage"))
);

const UserListPage = Loadable(
  lazy(() => import("pages/users/EditableTablePage"))
);

const RoleListPage = Loadable(
  lazy(() => import("pages/roles/EditableTablePage"))
);

const AccommodationListPage = Loadable(
  lazy(() => import("pages/hotel/accommodation"))
);

const OfferListPage = Loadable(
  lazy(() => import("pages/offers/offer"))
);

const BookingListPage = Loadable(lazy(() => import("pages/booking/booking")));

//room
const RoomListPage = Loadable(lazy(() => import("pages/room/room")));

// pages routing
const AuthLogin = Loadable(lazy(() => import("pages/auth/login")));
const AuthRegister = Loadable(lazy(() => import("pages/auth/register")));
const AuthForgotPassword = Loadable(
  lazy(() => import("pages/auth/forgot-password"))
);
const AuthResetPassword = Loadable(
  lazy(() => import("pages/auth/reset-password"))
);
const AuthCheckMail = Loadable(lazy(() => import("pages/auth/check-mail")));
const AuthCodeVerification = Loadable(
  lazy(() => import("pages/auth/code-verification"))
);

const MaintenanceError = Loadable(lazy(() => import("pages/maintenance/404")));
const MaintenanceError500 = Loadable(
  lazy(() => import("pages/maintenance/500"))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("pages/maintenance/under-construction"))
);
const MaintenanceComingSoon = Loadable(
  lazy(() => import("pages/maintenance/coming-soon"))
);

const AppContactUS = Loadable(lazy(() => import("pages/contact-us")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = 
{
  path: "/",
  children: [
    {
      path: "/",
      // element: (
      //   <AuthGuard>
      //     <MainLayout/>
      //   </AuthGuard>
      // ),
      element: <DashboardLayout />,
      children: [
        {
          path: "customer",
          children: [
            {
              path: "customer-list",
              element: <AppCustomerList />,
            },

            {
              path: "customer-card",
              element: <AppCustomerCard />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },
        {
          path: "dashboard",
          children: [
            {
              path: "default",
              element: <DashboardDefault />,
            },
            {
              path: "analytics",
              element: <DashboardAnalytics />,
            },
          ],
        },

        {
          path: "system-admin",
          children: [
            {
              path: "system-admin-list",
              element: <SystemAdminListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "eume",
          children: [
            {
              path: "EditableTablePage",
              element: <EditableTableListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "optional-survey",
          children: [
            {
              path: "OptionalSurveyPage",
              element: <OptionalSurveyListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "users",
          children: [
            {
              path: "UserListPage",
              element: <UserListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "roles",
          children: [
            {
              path: "RoleListPage",
              element: <RoleListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "accommodation",
          children: [
            {
              path: "accommodation-list",
              element: <AccommodationListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },

        {
          path: "offer",
          children: [
            {
              path: "offer-list",
              element: <OfferListPage />,
            }
          ]
        },
        {
          path: "booking",
          children: [
            {
              path: "booking-list",
              element: <BookingListPage />,
            },
          ],
        },

        {
          path: "room",
          children: [
            {
              path: "room-list",
              element: <RoomListPage />,
            },
            {
              path: "university-card",
              element: <AppCustomerCard />,
            },
          ],
        },
      ],
    },

    {
      path: "/maintenance",
      element: <PagesLayout />,
      children: [
        {
          path: "404",
          element: <MaintenanceError />,
        },
        {
          path: "500",
          element: <MaintenanceError500 />,
        },
        {
          path: "under-construction",
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: "coming-soon",
          element: <MaintenanceComingSoon />,
        },
      ],
    },

    {
      path: "/auth",
      element: <PagesLayout />,
      children: [
        {
          path: "login",
          element: <AuthLogin />,
        },
        {
          path: "register",
          element: <AuthRegister />,
        },
        {
          path: "forgot-password",
          element: <AuthForgotPassword />,
        },
        {
          path: "reset-password",
          element: <AuthResetPassword />,
        },
        {
          path: "check-mail",
          element: <AuthCheckMail />,
        },
        {
          path: "code-verification",
          element: <AuthCodeVerification />,
        },
      ],
    },

    {
      path: "/",
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [
        {
          path: "contact-us",
          element: <AppContactUS />,
        },
      ],
    },
  ],
};

export default MainRoutes;
