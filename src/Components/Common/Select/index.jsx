import { useEffect, useState } from "react";
import Select from "react-select";

export default function CustomSelect({ options, defaultValue, ...props }) {
  const [convertedOptions, setConvertedOptions] = useState([]);

  const convertOptions = (options = []) => {
    return options.map((item) => ({
      ...item,
      label: item.name,
      value: item.guid,
    }));
  };

  useEffect(() => {
    setConvertedOptions(convertOptions(options));
  }, [options]);

  return <Select {...props} options={convertedOptions} />;
}
