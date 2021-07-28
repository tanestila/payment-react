export type RoleType = {
  description: string;
  guid: string;
  name: string;
  type: string;
};

export type RoleForSelectType = RoleType & {
  name?: string;
  label?: string;
  value?: string;
  guid?: string;
};
