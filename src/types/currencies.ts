export type CurrencyType = {
  code: string;
  exchange_markup_value: number;
  guid: string;
  isFlat: boolean;
  name: string;
  number: string;
  rate_to_eur: number;
};

export type CurrencyForSelectType = CurrencyType & {
  name?: string;
  label?: string;
  value?: string;
  guid?: string;
};
