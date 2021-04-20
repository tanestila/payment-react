import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
// import { inverseSearch } from "../actions/search";
import PropTypes from "prop-types";

const ButtonFilter = (props) => {
  const [active, setActive] = useState(true);

  const handleShowFilters = async () => {
    await props.inverseSearch(!props.isSearch);
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

// const mapStateToProps = (state) => {
//   return {
//     isSearch: state.search.isSearch,
//   };
// };

export default ButtonFilter;

ButtonFilter.propTypes = {
  inverseSearch: PropTypes.func,
  isSearch: PropTypes.bool,
};
