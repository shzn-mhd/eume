import { lazy } from "react";

// project import
import ErrorBoundary from "./ErrorBoundary";
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";
import PagesLayout from "layout/Pages";
import SimpleLayout from "layout/Simple";
import { SimpleLayoutType } from "config";

import { loader as productsLoader, productLoader } from "api/products";
import AuthGuard from "utils/route-guard/AuthGuard";
import MainLayout from "layout/MainLayout";

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import("pages/dashboard/default"))
);
const DashboardAnalytics = Loadable(
  lazy(() => import("pages/dashboard/analytics"))
);

// render - widget
const WidgetStatistics = Loadable(
  lazy(() => import("pages/widget/statistics"))
);
const WidgetData = Loadable(lazy(() => import("pages/widget/data")));
const WidgetChart = Loadable(lazy(() => import("pages/widget/chart")));

// render - applications
const AppChat = Loadable(lazy(() => import("pages/apps/chat")));
const AppCalendar = Loadable(lazy(() => import("pages/apps/calendar")));

const AppKanban = Loadable(lazy(() => import("pages/apps/kanban")));
const AppKanbanBacklogs = Loadable(
  lazy(() => import("sections/apps/kanban/Backlogs"))
);
const AppKanbanBoard = Loadable(
  lazy(() => import("sections/apps/kanban/Board"))
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
const AppInvoiceCreate = Loadable(
  lazy(() => import("pages/apps/invoice/create"))
);
const AppInvoiceDashboard = Loadable(
  lazy(() => import("pages/apps/invoice/dashboard"))
);
const AppInvoiceList = Loadable(lazy(() => import("pages/apps/invoice/list")));
const AppInvoiceDetails = Loadable(
  lazy(() => import("pages/apps/invoice/details"))
);
const AppInvoiceEdit = Loadable(lazy(() => import("pages/apps/invoice/edit")));

const UserProfile = Loadable(lazy(() => import("pages/apps/profiles/user")));
const UserTabPersonal = Loadable(
  lazy(() => import("sections/apps/profiles/user/TabPersonal"))
);
const UserTabPayment = Loadable(
  lazy(() => import("sections/apps/profiles/user/TabPayment"))
);
const UserTabPassword = Loadable(
  lazy(() => import("sections/apps/profiles/user/TabPassword"))
);
const UserTabSettings = Loadable(
  lazy(() => import("sections/apps/profiles/user/TabSettings"))
);

const AccountProfile = Loadable(
  lazy(() => import("pages/apps/profiles/account"))
);
const AccountTabProfile = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabProfile"))
);
const AccountTabPersonal = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabPersonal"))
);
const AccountTabAccount = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabAccount"))
);
const AccountTabPassword = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabPassword"))
);
const AccountTabRole = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabRole"))
);
const AccountTabSettings = Loadable(
  lazy(() => import("sections/apps/profiles/account/TabSettings"))
);

const AppECommProducts = Loadable(
  lazy(() => import("pages/apps/e-commerce/products"))
);
const AppECommProductDetails = Loadable(
  lazy(() => import("pages/apps/e-commerce/product-details"))
);
const AppECommProductList = Loadable(
  lazy(() => import("pages/apps/e-commerce/products-list"))
);
const AppECommCheckout = Loadable(
  lazy(() => import("pages/apps/e-commerce/checkout"))
);
const AppECommAddProduct = Loadable(
  lazy(() => import("pages/apps/e-commerce/add-product"))
);

// render - forms & tables
const FormsValidation = Loadable(lazy(() => import("pages/forms/validation")));
const FormsWizard = Loadable(lazy(() => import("pages/forms/wizard")));

const FormsLayoutBasic = Loadable(
  lazy(() => import("pages/forms/layouts/basic"))
);
const FormsLayoutMultiColumn = Loadable(
  lazy(() => import("pages/forms/layouts/multi-column"))
);
const FormsLayoutActionBar = Loadable(
  lazy(() => import("pages/forms/layouts/action-bar"))
);
const FormsLayoutStickyBar = Loadable(
  lazy(() => import("pages/forms/layouts/sticky-bar"))
);

const FormsPluginsMask = Loadable(
  lazy(() => import("pages/forms/plugins/mask"))
);
const FormsPluginsClipboard = Loadable(
  lazy(() => import("pages/forms/plugins/clipboard"))
);
const FormsPluginsRecaptcha = Loadable(
  lazy(() => import("pages/forms/plugins/re-captcha"))
);
const FormsPluginsEditor = Loadable(
  lazy(() => import("pages/forms/plugins/editor"))
);
const FormsPluginsDropzone = Loadable(
  lazy(() => import("pages/forms/plugins/dropzone"))
);

const ReactTableBasic = Loadable(
  lazy(() => import("pages/tables/react-table/basic"))
);
const ReactDenseTable = Loadable(
  lazy(() => import("pages/tables/react-table/dense"))
);
const ReactTableSorting = Loadable(
  lazy(() => import("pages/tables/react-table/sorting"))
);
const ReactTableFiltering = Loadable(
  lazy(() => import("pages/tables/react-table/filtering"))
);
const ReactTableGrouping = Loadable(
  lazy(() => import("pages/tables/react-table/grouping"))
);
const ReactTablePagination = Loadable(
  lazy(() => import("pages/tables/react-table/pagination"))
);
const ReactTableRowSelection = Loadable(
  lazy(() => import("pages/tables/react-table/row-selection"))
);
const ReactTableExpanding = Loadable(
  lazy(() => import("pages/tables/react-table/expanding"))
);
const ReactTableEditable = Loadable(
  lazy(() => import("pages/tables/react-table/editable"))
);
const ReactTableDragDrop = Loadable(
  lazy(() => import("pages/tables/react-table/drag-drop"))
);
const ReactTableColumnVisibility = Loadable(
  lazy(() => import("pages/tables/react-table/column-visibility"))
);
const ReactTableColumnResizing = Loadable(
  lazy(() => import("pages/tables/react-table/column-resizing"))
);
const ReactTableStickyTable = Loadable(
  lazy(() => import("pages/tables/react-table/sticky"))
);
const ReactTableUmbrella = Loadable(
  lazy(() => import("pages/tables/react-table/umbrella"))
);
const ReactTableEmpty = Loadable(
  lazy(() => import("pages/tables/react-table/empty"))
);
const ReactTableVirtualized = Loadable(
  lazy(() => import("pages/tables/react-table/virtualized"))
);

// render - charts & map
const ChartApexchart = Loadable(lazy(() => import("pages/charts/apexchart")));
const ChartOrganization = Loadable(
  lazy(() => import("pages/charts/org-chart"))
);
const Map = Loadable(lazy(() => import("pages/map")));

// table routing
const MuiTableBasic = Loadable(
  lazy(() => import("pages/tables/mui-table/basic"))
);
const MuiTableDense = Loadable(
  lazy(() => import("pages/tables/mui-table/dense"))
);
const MuiTableEnhanced = Loadable(
  lazy(() => import("pages/tables/mui-table/enhanced"))
);
const MuiTableDatatable = Loadable(
  lazy(() => import("pages/tables/mui-table/datatable"))
);
const MuiTableCustom = Loadable(
  lazy(() => import("pages/tables/mui-table/custom"))
);
const MuiTableFixedHeader = Loadable(
  lazy(() => import("pages/tables/mui-table/fixed-header"))
);
const MuiTableCollapse = Loadable(
  lazy(() => import("pages/tables/mui-table/collapse"))
);

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

// render - sample page
const SamplePage = Loadable(
  lazy(() => import("pages/extra-pages/sample-page"))
);

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
