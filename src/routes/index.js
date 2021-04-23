import { Dashboard, Groups, Merchants, Partners } from "../views";
import MerchantDetail from "../views/Merchants/Detail";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    privilege: "READ_MERCHANTLOGIN",
  },
  {
    path: "/merchants",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: Merchants,
    layout: "/admin",
    privilege: "READ_USERMERCHANT",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: Groups,
    layout: "/admin",
    privilege: "READ_USERGROUP",
    collapse: true,
    state: "ssd",
    views: [
      {
        path: "/typography",
        name: "Typography1",
        icon: "nc-icon nc-paper-2",
        component: Partners,
        layout: "/admin",
        privilege: "READ_USERPARTNER",
      },
      {
        path: "/typography",
        name: "Typography2",
        icon: "nc-icon nc-paper-2",
        component: Partners,
        layout: "/admin",
        privilege: "READ_USERPARTNER",
      },
    ],
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Partners,
    layout: "/admin",
    privilege: "READ_USERPARTNER",
  },
];

export const adminNonNav = [
  {
    name: "Merchant detailed",
    path: "/about/merchant/:id",
    privilege: "READ_USERMERCHANT",
    component: MerchantDetail,
  },
];
