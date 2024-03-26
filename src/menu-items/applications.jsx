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
} from "@ant-design/icons";

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
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: "group-applications",
  title: <FormattedMessage id="applications" />,
  icon: icons.AppstoreAddOutlined,
  type: "group",
  children: [
    // {
    //   id: 'customer',
    //   title: <FormattedMessage id="customer" />,
    //   type: 'collapse',
    //   icon: icons.CustomerServiceOutlined,
    //   children: [
    //     {
    //       id: 'customer-list',
    //       title: <FormattedMessage id="list" />,
    //       type: 'item',
    //       url: '/customer/customer-list',
    //       actions: [
    //         {
    //           type: NavActionType.FUNCTION,
    //           label: 'Add Customer',
    //           function: () => handlerCustomerDialog(true),
    //           icon: icons.PlusOutlined
    //         }
    //       ]
    //     },
    //     {
    //       id: 'customer-card',
    //       title: <FormattedMessage id="cards" />,
    //       type: 'item',
    //       url: '/customer/customer-card'
    //     }
    //   ]
    // },

    {
      id: "dashboard",
      title: <FormattedMessage id="Dashboard" />,
      type: "item",
      icon: icons.DashboardOutlined,
      url: "/dashboard/default",
    },
    {
      id: "system-admin",
      title: <FormattedMessage id="System Admin" />,
      type: "item",
      icon: icons.BankOutlined,
      url: "/system-admin/system-admin-list",  
      // actions: [
      //   {
      //     type: NavActionType.FUNCTION,
      //     label: 'Add University',
      //     function: () => handlerCustomerDialog(true),
      //     icon: icons.PlusOutlined
      //   }
      // ]
    },

    {
      id: "accommodation",
      title: <FormattedMessage id="Hotel" />,
      type: "item",
      icon: icons.BankOutlined,
      url: "/accommodation/accommodation-list",  
      // actions: [
      //   {
      //     type: NavActionType.FUNCTION,
      //     label: 'Add University',
      //     function: () => handlerCustomerDialog(true),
      //     icon: icons.PlusOutlined
      //   }
      // ]
    },

    {
      id: "offer",
      title: <FormattedMessage id="Offer" />,
      type: "item",
      icon: icons.BankOutlined,
      url: "/offer/offer-list",  
      // actions: [
      //   {
      //     type: NavActionType.FUNCTION,
      //     label: 'Add University',
      //     function: () => handlerCustomerDialog(true),
      //     icon: icons.PlusOutlined
      //   }
      // ]
    },
  ],
};

export default applications;
