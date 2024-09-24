// third-party
import { FormattedMessage } from "react-intl";

// project-imports
import { NavActionType } from "config";
import { handlerCustomerDialog } from "api/customer";

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  PlusOutlined,
  LinkOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  ReadOutlined,
  NotificationOutlined,
  ManOutlined,
  FileSearchOutlined,
  PieChartOutlined,
  AlertOutlined
} from "@ant-design/icons";

import { useTranslation } from 'react-i18next';
import { createContext, useContext, useMemo } from "react";

// icons
const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  PlusOutlined,
  LinkOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  ReadOutlined,
  NotificationOutlined,
  ManOutlined,
  FileSearchOutlined,
  PieChartOutlined,
  AlertOutlined
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const MenuConfigContext = createContext();
export const useMenuConfig = () => useContext(MenuConfigContext);

export const MenuConfigProvider = ({ children }) => {
  const { t } = useTranslation();

  const applications = useMemo(() => ({
    id: 'group-applications',
    title: t('applications'),
    icon: icons.AppstoreAddOutlined,
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: t('Dashboard'),
        type: 'item',
        icon: icons.DashboardOutlined,
        url: '/dashboard/default',
      },
      {
        id: 'eume',
        title: t('Basic Survey'),
        type: 'item',
        icon: icons.PieChartOutlined,
        url: '/eume/EditableTablePage',
      },
      {
        id: 'optional-survey',
        title: t('Optional Survey'),
        type: 'item',
        icon: icons.FileSearchOutlined,
        url: '/optional-survey/OptionalSurveyPage',
      },
      {
        id: 'users',
        title: t('Users'),
        type: 'item',
        icon: icons.UserOutlined,
        url: '/users/UserListPage',
      },
      {
        id: 'roles',
        title: t('User Roles'),
        type: 'item',
        icon: icons.AlertOutlined,
        url: '/roles/RoleListPage',
      },
    ],
  }), [t]);

  return (
    <MenuConfigContext.Provider value={{ applications }}>
      {children}
    </MenuConfigContext.Provider>
  );
}


// const applications =  {

//   // const { t } = useTranslation();

  
//   id: "group-applications",
//   // title: <FormattedMessage id="applications" />,
//   icon: icons.AppstoreAddOutlined,
//   type: "group",
//   children: [

//     {
//       id: "dashboard",
//       title: <FormattedMessage id="Dashboard" />,
//       type: "item",
//       icon: icons.DashboardOutlined,
//       url: "/dashboard/default",
//     },
//     // {
//     //   id: "system-admin",
//     //   title: <FormattedMessage id="System Admin" />,
//     //   type: "item",
//     //   icon: icons.BankOutlined,
//     //   url: "/system-admin/system-admin-list",
//     //   // actions: [
//     //   //   {
//     //   //     type: NavActionType.FUNCTION,
//     //   //     label: 'Add University',
//     //   //     function: () => handlerCustomerDialog(true),
//     //   //     icon: icons.PlusOutlined
//     //   //   }
//     //   // ]
//     // },

//     {
//       id: "eume",
//       title: <FormattedMessage id="Basic Survey" />,
//       // title: 'Basic Survey',
//       type: "item",
//       icon: icons.PieChartOutlined,
//       url: "/eume/EditableTablePage",  
//     },

//     {
//       id: "optional-survey",
//       title: <FormattedMessage id="Optional Survey" />,
//       type: "item",
//       icon: icons.FileSearchOutlined,
//       url: "/optional-survey/OptionalSurveyPage",  
//     },

//     // {
//     //   id: "offer",
//     //   title: <FormattedMessage id="Offer" />,
//     //   type: "item",
//     //   icon: icons.BankOutlined,
//     //   url: "/offer/offer-list",  
//     //   // actions: [
//     //   //   {
//     //   //     type: NavActionType.FUNCTION,
//     //   //     label: 'Add University',
//     //   //     function: () => handlerCustomerDialog(true),
//     //   //     icon: icons.PlusOutlined
//     //   //   }
//     //   // ]
//     // },

//     // {
//     //   id: "booking",
//     //   title: <FormattedMessage id="Booking" />,
//     //   type: "item",
//     //   icon: icons.BankOutlined,
//     //   url: "/booking/booking-list",  
//     //   // actions: [
//     //   //   {
//     //   //     type: NavActionType.FUNCTION,
//     //   //     label: 'Add University',
//     //   //     function: () => handlerCustomerDialog(true),
//     //   //     icon: icons.PlusOutlined
//     //   //   }
//     //   // ]
//     // },
//     // {
//     //   id: "room",
//     //   title: <FormattedMessage id="Room" />,
//     //   type: "item",
//     //   icon: icons.BankOutlined,
//     //   url: "/room/room-list",  
//     //   // actions: [
//     //   //   {
//     //   //     type: NavActionType.FUNCTION,
//     //   //     label: 'Add University',
//     //   //     function: () => handlerCustomerDialog(true),
//     //   //     icon: icons.PlusOutlined
//     //   //   }
//     //   // ]
//     // },
//   ],

// };

// export default applications;
