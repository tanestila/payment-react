import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../../../../../redux/modules/table";

export default function SearchInput({ isSearch, label, setParams }) {
  // const dispatch = useDispatch();
  // const params = useSelector((state) => state.table.searchParams);
  const [value, setValue] = useState();

  // useEffect(() => {
  //   if (params && params[label] !== value) setValue(params[label]);
  // }, []);

  // useEffect(() => {
  //   setParams(label, value);
  // }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      // dispatch(setSearchParams({ [label]: value }));
    }
  };

  const handleReset = async () => {
    setValue("");
    // dispatch(setSearchParams({ [label]: undefined }));
  };

  return (
    <div
      className={
        isSearch
          ? "searchOpen search search-input"
          : "searchClosed search search-input"
      }
    >
      <InputGroup>
        <Form.Control
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={label ? label.replace(/_/g, " ") : "search"}
        />
        <InputGroup.Append>
          <i
            className="icon-delete icon"
            onClick={handleReset}
            style={{ cursor: "pointer" }}
          ></i>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
