import {
  Dashboard,
  Groups,
  Merchants,
  Partners,
  AllTransactions,
  Currencies,
  Admins,
  Shops,
  Chargebacks,
} from "../views";
import MerchantDetail from "../views/Users/Merchants/Detail";
import { StoryUI } from "../Components/StoryUI";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "icon-dashboard",
    component: Dashboard,
    privilege: "READ_MERCHANTLOGIN",
  },
  {
    collapse: true,
    name: "Users",
    icon: "icon-users",
    state: "users",
    views: [
      {
        path: "/users/merchants",
        name: "Merchants",
        privilege: "READ_USERMERCHANT",
        component: Merchants,
      },
      {
        path: "/users/groups",
        name: "Groups",
        privilege: "READ_USERGROUP",
        component: Groups,
      },
      {
        path: "/users/partners",
        name: "Partners",
        privilege: "READ_USERPARTNER",
        component: Partners,
      },
      {
        path: "/users/admins",
        name: "Admins",
        privilege: "READ_USERADMIN",
        component: Admins,
      },
    ],
  },
  {
    path: "/shops",
    name: "Shops",
    icon: "icon-shops",
    privilege: "READ_SHOPS",
    component: Shops,
  },
  {
    collapse: true,
    name: "Transactions",
    icon: "icon-transactions",
    state: "transactions",
    views: [
      {
        path: "/transactions/history",
        name: "All transactions",
        privilege: "READ_SHOPS",
        component: AllTransactions,
      },
      {
        path: "/transactions/templates",
        name: "Templates",
        privilege: "READ_TRANSACTIONTEMPLATES",
        component: Partners,
      },
      {
        path: "/transactions/orders",
        name: "Orders",
        privilege: "REPORT_ORDERS",
        component: Partners,
      },
      {
        path: "/transactions/chargebacks",
        name: "Chargebacks",
        privilege: "READ_CHARGEBACKS",
        component: Chargebacks,
      },
      {
        path: "/transactions/mismatch",
        name: "Mismatch Transaction",
        privilege: "READ_TRANSACTIONSHISTORY",
        component: Partners,
      },
      {
        path: "/transactions/statements",
        name: "Statements",
        privilege: "READ_STATEMENTS",
        component: Partners,
      },
    ],
  },
  {
    collapse: true,
    name: "System",
    icon: "icon-system",
    state: "system",
    layout: "/admin",
    views: [
      {
        path: "/currencies",
        name: "Currencies",
        privilege: "READ_CURRENCIES",
        component: Currencies,
      },
    ],
  },
  {
    path: "/ui",
    name: "UI COMPONENTS",
    icon: "icon-shops",
    privilege: "READ_SHOPS",
    component: StoryUI,
  },
  // {
  //   path: "/merchants",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: Merchants,
  //   layout: "/admin",
  //   privilege: "READ_USERMERCHANT",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: Groups,
  //   layout: "/admin",
  //   privilege: "READ_USERPARTNER",
  //   collapse: true,
  //   state: "ssd",
  //   views: [
  //     {
  //       path: "/typography",
  //       name: "Typography1",
  //       icon: "nc-icon nc-paper-2",
  //       component: Partners,
  //       layout: "/admin",
  //       privilege: "READ_USERPARTNER",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography2",
  //       icon: "nc-icon nc-paper-2",
  //       component: Partners,
  //       layout: "/admin",
  //       privilege: "READ_USERPARTNER",
  //     },
  //   ],
  // },
  // {
  //   path: "/table",
  //   name: "Table List1",
  //   icon: "nc-icon nc-notes",
  //   component: Groups,
  //   layout: "/admin",
  //   privilege: "READ_USERPARTNER",
  //   collapse: true,
  //   state: "ssd21",
  //   views: [
  //     {
  //       path: "/typography1",
  //       name: "Typography11",
  //       icon: "nc-icon nc-paper-2",
  //       component: Partners,
  //       layout: "/admin2121",
  //       privilege: "READ_USERPARTNER",
  //     },
  //     {
  //       path: "/typography121",
  //       name: "Typography21212",
  //       icon: "nc-icon nc-paper-2",
  //       component: Partners,
  //       layout: "/admi121n",
  //       privilege: "READ_USERPARTNER",
  //     },
  //   ],
  // },
];

export const adminNonNav = [
  {
    name: "Merchant detailed",
    path: "/about/merchant/:id",
    privilege: "READ_USERMERCHANT",
    component: MerchantDetail,
  },
];

export const merchantRoutes = [
  {
    path: "/shops",
    name: "Shops",
    layout: "/merchant",
    icon: "icon-shops",
    privilege: "READ_MERCHANTSHOP",
    component: Shops,
  },
];

export const groupRoutes = [
  {
    path: "/shops",
    name: "Shops",
    layout: "/group",
    icon: "icon-shops",
    privilege: "READ_SHOPS",
    component: Shops,
  },
];

export const partnerRoutes = [
  {
    path: "/shops",
    name: "Shops",
    layout: "/partner",
    icon: "icon-shops",
    privilege: "READ_SHOPS",
    component: Shops,
  },
];
