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
  Statements,
  AdminDashboard,
} from "../views";
import MerchantDetail from "../views/Users/Merchants/Detail";
import { StoryUI } from "../Components/StoryUI";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "icon-dashboard",
    component: AdminDashboard,
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
        component: Statements,
      },
    ],
  },
  {
    collapse: true,
    name: "System",
    icon: "icon-system",
    state: "system",
    views: [
      {
        path: "/gateways",
        name: "Gateways",
        privilege: "READ_GATEWAYS",
        component: Currencies,
      },
      {
        path: "/rates",
        name: "Rates",
        alias: "READ_RATES",
        component: Currencies,
      },
      {
        path: "/rate/template",
        name: "Rates templates",
        alias: "READ_RATES",
        component: Currencies,
      },
      {
        path: "/currencies",
        name: "Currencies",
        privilege: "READ_CURRENCIES",
        component: Currencies,
      },
      {
        path: "/services",
        name: "Services",
        alias: "READ_SERVICES",
        component: Currencies,
      },
      {
        path: "/additional-fees",
        name: "Additional fees",
        alias: "READ_STATEMENTS",
        component: Currencies,
      },
    ],
  },
  {
    collapse: true,
    name: "Reports",
    icon: "icon-reports",
    state: "reports",
    views: [
      {
        path: "/report/daily",
        name: "Daily Report",
        privilege: "REPORT_GATEWAYS",
        component: Currencies,
      },
      {
        path: "/report/basic",
        name: "Basic Report",
        alias: "REPORT_RATES",
        component: Currencies,
      },
      {
        path: "/report/transaction_and_commission",
        name: "Transaction & Commission",
        alias: "REPORT_TRANSACTIONANDCOMISSION",
        component: Currencies,
      },
      {
        path: "/report/error",
        name: "Error Report",
        privilege: "REPORT_TRANSACTIONERRORS",
        component: Currencies,
      },
      {
        path: "/report/transaction_histogram",
        name: "Histogram Report",
        alias: "REPORT_TRANSACTIONHISTOGRAM",
        component: Currencies,
      },
      {
        path: "/report/geographic",
        name: "Geographic Report",
        alias: "REPORT_TRANSACTIONGEO",
        component: Currencies,
      },
    ],
  },
  {
    collapse: true,
    name: "Logs",
    icon: "icon-logs",
    state: "logs",
    views: [
      {
        path: "/logs/admins",
        name: "Admins logs",
        privilege: "LOG_GATEWAYS",
        component: Currencies,
      },
      {
        path: "/logs/merchants",
        name: "Merchants logs",
        alias: "LOG_MERCHANT",
        component: Currencies,
      },
      {
        path: "/logs/groups",
        name: "Groups logs",
        alias: "LOG_GROUP",
        component: Currencies,
      },
      {
        path: "/logs/partners",
        name: "Partners logs",
        privilege: "LOG_PARTNER",
        component: Currencies,
      },
      {
        path: "/logs/transactions",
        name: "Transactions logs",
        alias: "LOG_TRANSACTION",
        component: Currencies,
      },
      {
        path: "/logs/service",
        name: "Service logs",
        alias: "REPORT_TRANSACTIONGEO",
        component: Currencies,
      },
    ],
  },
  {
    collapse: true,
    name: "Audit tables",
    icon: "icon-audit_tables",
    state: "audit",
    views: [
      {
        path: "/audit/user_table",
        name: "Users",
        privilege: "LOG_GATEWAYS",
        component: Currencies,
      },
      {
        path: "/audit/shop_table",
        name: "Shops",
        alias: "AUDIT_SHOPS",
        component: Currencies,
      },
      {
        path: "/audit/terminal_table",
        name: "Terminals",
        alias: "AUDIT_TERMINALS",
        component: Currencies,
      },
      {
        path: "/audit/transaction_table",
        name: "Transactions",
        privilege: "AUDIT_TERMINALS",
        component: Currencies,
      },
      {
        path: "/audit/gateway_table",
        name: "Gateways",
        alias: "AUDIT_GATEWAYS",
        component: Currencies,
      },
      {
        path: "/audit/currency_table",
        name: "Currencies",
        alias: "AUDIT_CURRENCIES",
        component: Currencies,
      },
      {
        path: "/audit/service_table",
        name: "Services",
        alias: "AUDIT_SERVICESETTINGS",
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
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" },
];

export const adminNonNav = [
  {
    nonNav: true,
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
