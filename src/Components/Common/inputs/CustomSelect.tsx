import { useEffect, useState } from "react";
import Select from "react-select";

type CustomSelectProps = {
  options: Array<any>;
  onChange: any;
  defaultValue?: any;
  // styles?: any;
  value?: any;
  isMulti?: boolean;
  className?: string;
};

const customStyles = {
  control: (base: any) => ({
    ...base,

    "min-height": "39px",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  multiValue: (base: any) => ({
    ...base,
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0px 6px",
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
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
    <Select
      {...props}
      styles={customStyles}
      classNamePrefix="select"
      options={convertedOptions}
    />
  );
};
