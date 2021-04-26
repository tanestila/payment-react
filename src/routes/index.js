import { Dashboard, Groups, Merchants, Partners } from "../views";
import MerchantDetail from "../views/Merchants/Detail";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "icon-dashboard",
    component: Dashboard,
    layout: "/admin",
    privilege: "READ_MERCHANTLOGIN",
  },
  {
    collapse: true,
    name: "Users",
    icon: "icon-users",
    state: "users",
    layout: "/admin",
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
        component: Partners,
      },
    ],
  },
  {
    path: "/shops",
    name: "Shops",
    layout: "/admin",
    icon: "icon-shops",
    privilege: "READ_SHOPS",
    component: Partners,
  },
  {
    collapse: true,
    name: "Transactions",
    icon: "icon-transactions",
    state: "transactions",
    layout: "/admin",
    views: [
      {
        path: "/transactions/history",
        name: "All transactions",
        privilege: "READ_SHOPS",
        component: Partners,
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
        component: Partners,
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
