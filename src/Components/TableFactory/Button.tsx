import React, { useState } from "react";
import { Button } from "antd";

type ButtonFilterProps = {
  handleClick: Function;
};
export const ButtonFilter: React.FC<ButtonFilterProps> = ({ handleClick }) => {
  const [active, setActive] = useState(true);

  const handleShowFilters = async () => {
    setActive(!active);
    handleClick();
  };
  return (
    <Button className={"  filter"} onClick={handleShowFilters}>
      Filters
      <i className="icon-filters icon"></i>
    </Button>
  );
};
