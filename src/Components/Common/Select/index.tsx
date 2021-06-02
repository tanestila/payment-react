import { useEffect, useState } from "react";
import Select from "react-select";

type CustomSelectProps = {
  options: Array<any>;
  defaultValue: any;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
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

  return <Select {...props} options={convertedOptions} />;
};
