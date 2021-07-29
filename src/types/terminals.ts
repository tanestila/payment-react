export type TerminalType = {
  created_at: string;
  created_by: string;
  created_by_username: string;
  email: string;
  enabled: boolean;
  guid: string;
  merchant_guid: string;
  merchant_name: string;
  name: string;
  note: string;
  phone: string;
  terminal_count: string;
  updated_at: string;
  updated_by: string;
  updated_by_username: string;
  url: Array<string>;
};

export type TerminalForSelectType = TerminalType & {
  name?: string;
  label?: string;
  value?: string;
  guid?: string;
};
