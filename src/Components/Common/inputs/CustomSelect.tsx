import { useEffect, useState } from "react";
import Select from "react-select";

type CustomSelectProps = {
  options: Array<any>;
  onChange: any;
  defaultValue?: any;
  styles?: any;
  value?: any;
  isMulti?: boolean;
  className?: string;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  ...props
}) => {
  const [convertedOptions, setConvertedOptions] = useState<Array<any>>([]);

  const convertOptions = (options: Array<any>): Array<any> => {
    return options.map((item: any) => ({
      ...item,
      label: item.name,
      value: item.guid,
    }));
  };

  useEffect(() => {
    setConvertedOptions(convertOptions(options));
  }, [options]);

  return (
    <Select {...props} classNamePrefix="select" options={convertedOptions} />
  );
};
