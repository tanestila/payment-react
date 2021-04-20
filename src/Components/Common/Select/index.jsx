import { useEffect, useState } from "react";

export default function Select({ options, ...props }) {
  const [convertedOptions, setConvertedOptions] = useState([]);

  const convertOptions = (options = []) => {
    return options.map((item) => ({
      ...item,
      label: item.name,
      value: item.guid,
    }));
  };

  // useEffect(() => {
  //   setConvertedOptions(convertOptions(options));
  // }, [options]);

  return <Select {...props} options={options} />;
}
