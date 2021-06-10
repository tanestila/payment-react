import React, { useState } from "react";
import { Button } from "antd";

type ButtonFilterProps = {
  handleClick: Function;
};

export const ButtonFilter: React.FC<ButtonFilterProps> = ({ handleClick }) => {
  const [active, setActive] = useState(true);
  // const dispatch = useDispatch();

  const handleShowFilters = async () => {
    // dispatch(toggleIsSearch());
    setActive(!active);
    handleClick();
  };

  return (
    <Button
      className={"  filter"}
      onClick={handleShowFilters}
      // style={{
      //   color: active ? "#1378CB" : "#104A9D",
      //   backgroundColor: "white",
      // }}
    >
      Filters
      <i className="icon-filters icon"></i>
    </Button>
  );
};
