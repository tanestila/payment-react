export type MerchantType = {
  email: string;
  enabled: boolean;
  gateways: Array<string>;
  group_guid: string | null;
  group_name: string | null;
  login_guid: string;
  merchant_guid: string;
  merchant_name: string;
  merchant_type: string;
  partner_guid: string | null;
  partner_name: string | null;
  username: string;
};
