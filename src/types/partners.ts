export type PartnerType = {
  email: string;
  enabled: boolean;
  login_guid: string;
  partner_guid: string;
  partner_name: string;
  partner_type: string;
  username: string;
};

export type PartnerForSelectType = PartnerType & {
  name?: string;
  label?: string;
  value?: string;
  guid?: string;
};
