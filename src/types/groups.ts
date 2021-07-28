export type GroupType = {
  email: string;
  enabled: boolean;
  login_guid: string;
  group_guid: string;
  group_name: string | null;
  group_type: string | null;
  partner_guid: string | null;
  partner_name: string | null;
  username: string;
};

export type GroupForSelectType = GroupType & {
  name?: string;
  label?: string;
  value?: string;
  guid?: string;
};
