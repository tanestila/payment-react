import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleIsSearch } from "../../redux/modules/table";

const ButtonFilter = (props) => {
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();

  const handleShowFilters = async () => {
    dispatch(toggleIsSearch());
    setActive(!active);
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

export default ButtonFilter;
