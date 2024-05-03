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

    {
      id: "dashboard",
      title: <FormattedMessage id="Dashboard" />,
      type: "item",
      icon: icons.DashboardOutlined,
      url: "/dashboard/default",
    },
    // {
    //   id: "system-admin",
    //   title: <FormattedMessage id="System Admin" />,
    //   type: "item",
    //   icon: icons.BankOutlined,
    //   url: "/system-admin/system-admin-list",
    //   // actions: [
    //   //   {
    //   //     type: NavActionType.FUNCTION,
    //   //     label: 'Add University',
    //   //     function: () => handlerCustomerDialog(true),
    //   //     icon: icons.PlusOutlined
    //   //   }
    //   // ]
    // },

    {
      id: "eume",
      title: <FormattedMessage id="SURVEY" />,
      type: "item",
      icon: icons.BankOutlined,
      url: "/eume/EditableTablePage",  
    },

    // {
    //   id: "offer",
    //   title: <FormattedMessage id="Offer" />,
    //   type: "item",
    //   icon: icons.BankOutlined,
    //   url: "/offer/offer-list",  
    //   // actions: [
    //   //   {
    //   //     type: NavActionType.FUNCTION,
    //   //     label: 'Add University',
    //   //     function: () => handlerCustomerDialog(true),
    //   //     icon: icons.PlusOutlined
    //   //   }
    //   // ]
    // },

    // {
    //   id: "booking",
    //   title: <FormattedMessage id="Booking" />,
    //   type: "item",
    //   icon: icons.BankOutlined,
    //   url: "/booking/booking-list",  
    //   // actions: [
    //   //   {
    //   //     type: NavActionType.FUNCTION,
    //   //     label: 'Add University',
    //   //     function: () => handlerCustomerDialog(true),
    //   //     icon: icons.PlusOutlined
    //   //   }
    //   // ]
    // },
    // {
    //   id: "room",
    //   title: <FormattedMessage id="Room" />,
    //   type: "item",
    //   icon: icons.BankOutlined,
    //   url: "/room/room-list",  
    //   // actions: [
    //   //   {
    //   //     type: NavActionType.FUNCTION,
    //   //     label: 'Add University',
    //   //     function: () => handlerCustomerDialog(true),
    //   //     icon: icons.PlusOutlined
    //   //   }
    //   // ]
    // },
  ],
};

export default applications;
