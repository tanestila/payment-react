import {
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
  AdminDetail,
  MerchantDetail,
  GroupDetail,
  PartnerDetail,
  Templates,
  ShopDetail,
  ProcessingDetail,
  Orders,
  MismatchTransactions,
  Gateways,
  Rates,
  RatesTemplates,
  Services,
  AdditionalFees,
  AdminsLogs,
  MerchantsLogs,
  GroupsLogs,
  PartnersLogs,
  TransactionsLogs,
  ServicesLogs,
  ShopsAudit,
  TerminalsAudit,
  TransactionAudit,
  GatewaysAudit,
  CurrenciesAudit,
  ServicesAudit,
  BlacklistRules,
  GlobalBlacklist,
  MerchantBlacklist,
  UsersAudit,
  RolesAndPrivileges,
  BasicReport,
  OrderDetail,
  ChargebackDetail,
  MismatchDetail,
  StatementCreator,
  StatementDetail,
  GatewayDetail,
  RateDetail,
  TerminalDetail,
  StatementMerge,
  DailyReport,
  TransactionAndCommission,
  HistogramReport,
  GeographicReport,
  ErrorReport,
  RevisionDetail,
  RateTemplateDetail,
} from "../views";
import { StoryUI } from "../Components/StoryUI";
import TemplatesDetail from "../views/Transactions/Templates/Detail";
import TransactionForm from "../views/TestForm";

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
        activeNonNavRoutes: ["/about/merchant"],
        privilege: "READ_USERMERCHANT",
        component: Merchants,
      },
      {
        path: "/users/groups",
        name: "Groups",
        activeNonNavRoutes: ["/about/group"],
        privilege: "READ_USERGROUP",
        component: Groups,
      },
      {
        path: "/users/partners",
        name: "Partners",
        activeNonNavRoutes: ["/about/partner"],
        privilege: "READ_USERPARTNER",
        component: Partners,
      },
      {
        path: "/users/admins",
        name: "Admins",
        activeNonNavRoutes: ["/about/admin"],
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
        component: Templates,
      },
      {
        path: "/transactions/orders",
        name: "Orders",
        privilege: "REPORT_ORDERS",
        component: Orders,
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
        component: MismatchTransactions,
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
        component: Gateways,
      },
      {
        path: "/rates",
        name: "Rates",
        alias: "READ_RATES",
        component: Rates,
      },
      {
        path: "/rate/template",
        name: "Rates templates",
        alias: "READ_RATES",
        component: RatesTemplates,
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
        component: Services,
      },
      {
        path: "/additional-fees",
        name: "Additional fees",
        alias: "READ_STATEMENTS",
        component: AdditionalFees,
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
        component: DailyReport,
      },
      {
        path: "/report/basic",
        name: "Basic Report",
        alias: "REPORT_RATES",
        component: BasicReport,
      },
      {
        path: "/report/transaction_and_commission",
        name: "Transaction & Commission",
        alias: "REPORT_TRANSACTIONANDCOMISSION",
        component: TransactionAndCommission,
      },
      {
        path: "/report/error",
        name: "Error Report",
        privilege: "REPORT_TRANSACTIONERRORS",
        component: ErrorReport,
      },
      {
        path: "/report/transaction_histogram",
        name: "Histogram Report",
        alias: "REPORT_TRANSACTIONHISTOGRAM",
        component: HistogramReport,
      },
      {
        path: "/report/geographic",
        name: "Geographic Report",
        alias: "REPORT_TRANSACTIONGEO",
        component: GeographicReport,
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
        component: AdminsLogs,
      },
      {
        path: "/logs/merchants",
        name: "Merchants logs",
        alias: "LOG_MERCHANT",
        component: MerchantsLogs,
      },
      {
        path: "/logs/groups",
        name: "Groups logs",
        alias: "LOG_GROUP",
        component: GroupsLogs,
      },
      {
        path: "/logs/partners",
        name: "Partners logs",
        privilege: "LOG_PARTNER",
        component: PartnersLogs,
      },
      {
        path: "/logs/transactions",
        name: "Transactions logs",
        alias: "LOG_TRANSACTION",
        component: TransactionsLogs,
      },
      {
        path: "/logs/service",
        name: "Service logs",
        alias: "REPORT_TRANSACTIONGEO",
        component: ServicesLogs,
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
        component: UsersAudit,
      },
      {
        path: "/audit/shop_table",
        name: "Shops",
        alias: "AUDIT_SHOPS",
        component: ShopsAudit,
      },
      {
        path: "/audit/terminal_table",
        name: "Terminals",
        alias: "AUDIT_TERMINALS",
        component: TerminalsAudit,
      },
      {
        path: "/audit/transaction_table",
        name: "Transactions",
        privilege: "AUDIT_TERMINALS",
        component: TransactionAudit,
      },
      {
        path: "/audit/gateway_table",
        name: "Gateways",
        alias: "AUDIT_GATEWAYS",
        component: GatewaysAudit,
      },
      {
        path: "/audit/currency_table",
        name: "Currencies",
        alias: "AUDIT_CURRENCIES",
        component: CurrenciesAudit,
      },
      {
        path: "/audit/service_table",
        name: "Services",
        alias: "AUDIT_SERVICESETTINGS",
        component: ServicesAudit,
      },
    ],
  },

  {
    collapse: true,
    name: "Security",
    icon: "icon-security",
    state: "security",
    views: [
      {
        path: "/blacklist",
        name: "BlackList rules",
        privilege: "READ_BLACKLISTS",
        component: BlacklistRules,
      },
      {
        path: "/global-blacklist",
        name: "Global BlackList",
        alias: "READ_GLOBALBLACKLISTS",
        component: GlobalBlacklist,
      },
      {
        path: "/merchants-blacklist",
        name: "Merchants BlackList",
        alias: "READ_BLACKLISTS",
        component: MerchantBlacklist,
      },
      {
        path: "/roles-privileges",
        name: "Roles / Privileges",
        alias: "READ_ROLES",
        component: RolesAndPrivileges,
      },
    ],
  },
  {
    path: "/send-transaction",
    name: "Test form",
    icon: "icon-test_form",
    privilege: "FORM_TRANSACTIONTEST",
    component: TransactionForm,
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
    mainName: "Users",
    name: "Merchant detailed",
    path: "/about/merchant/:id",
    privilege: "READ_USERMERCHANT",
    component: MerchantDetail,
  },
  {
    nonNav: true,
    mainName: "Users",
    name: "Group detailed",
    path: "/about/group/:id",
    privilege: "READ_USERMERCHANT",
    component: GroupDetail,
  },
  {
    nonNav: true,
    mainName: "Users",
    name: "Partner detailed",
    path: "/about/partner/:id",
    privilege: "READ_USERMERCHANT",
    component: PartnerDetail,
  },
  {
    nonNav: true,
    mainName: "Users",
    name: "Admin detailed",
    path: "/about/admin/:id",
    privilege: "READ_USERMERCHANT",
    component: AdminDetail,
  },
  {
    nonNav: true,
    mainName: "Shops",
    name: "Shop detailed",
    path: "/about/shop/:id",
    privilege: "READ_USERMERCHANT",
    component: ShopDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Processing detailed",
    path: "/about/processing/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: ProcessingDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Template detailed",
    path: "/about/template/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: TemplatesDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Order detailed",
    path: "/about/order/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: OrderDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Chargeback detailed",
    path: "/about/chargeback/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: ChargebackDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Mismatch transaction detailed",
    path: "/about/mismatch/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: MismatchDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Terminal detailed",
    path: "/about/shop/:shopId/terminal/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: TerminalDetail,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Interim statement",
    path: "/interim/statement",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: StatementCreator,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Payable statement",
    path: "/payable/statement",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: StatementMerge,
  },
  {
    nonNav: true,
    mainName: "Transactions",
    name: "Statement detail",
    path: "/about/statement/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: StatementDetail,
  },
  {
    nonNav: true,
    mainName: "Systems",
    name: "Gateway detail",
    path: "/about/gateway/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: GatewayDetail,
  },
  {
    nonNav: true,
    mainName: "Systems",
    name: "Rates detail",
    path: "/about/rate/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: RateDetail,
  },
  {
    nonNav: true,
    mainName: "Systems",
    name: "Template detail",
    path: "/about/rate-template/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: RateTemplateDetail,
  },

  {
    nonNav: true,
    mainName: "Systems",
    name: "Revision detail",
    path: "/about/rates/:rate_id/revision/:id",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: RevisionDetail,
  },
  {
    nonNav: true,
    mainName: "Shops",
    name: "Terminal detail",
    path: "/about/:shop_guid/terminal/:terminal_guid",
    privilege: "READ_TRANSACTIONSHISTORY",
    component: TerminalDetail,
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
