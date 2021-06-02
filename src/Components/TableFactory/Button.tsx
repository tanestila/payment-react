import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
      className={"btn btn-fill btn-primary filter"}
      onClick={handleShowFilters}
      style={{ backgroundColor: active ? "#1378CB" : "#104A9D" }}
    >
      Filters
      <i className="icon-filters icon"></i>
    </Button>
  );
};
