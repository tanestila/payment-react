import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setSearchParams } from "../../../../redux/modules/table";
import BoolInput from "./SearchInputs/BoolInput";
import SearchInput from "./SearchInputs/SearchInput";

export default function TableHeader({
  columns,
  disableSort = false,
  disableSearch = false,
  onSort,
}) {
  const { sortDirectState } = useSelector((state) => state.table);
  const [isSearch, setIsSearch] = useState(true);
  const dispatch = useDispatch();
  const createKey = () => {
    return uuidv4();
  };

  const setParams = (label, value) => {
    dispatch(setSearchParams({ [label]: value }));
  };

  return (
    <thead>
      {/* <tr style={{ textAlign: "center" }}> */}
      {/* {collapsedHeader
            ? collapsedHeader.map((item) => (
                <th
                  key={item.name}
                  colSpan={item.collapse.length}
                  style={
                    item.style
                      ? {
                          ...item.style,
                          textAlign: "center",
                          color: "black",
                          fontWeight: "bold",
                        }
                      : {
                          textAlign: "center",
                          color: "black",
                          fontWeight: "bold",
                        }
                  }
                >
                  {item.name}
                </th>
              ))
            : null} */}
      {/* </tr> */}

      {!disableSearch && (
        <tr className="search-row">
          {columns.map((column) => (
            <th
              key={createKey()}
              className={isSearch ? "searchOpen" : "searchClosed"}
            >
              {column.search && (
                <>
                  {column.search === "text" ? (
                    <SearchInput
                      isSearch={isSearch}
                      label={column.accessor}
                      setParams={setParams}
                    />
                  ) : column.search === "bool" ? (
                    <BoolInput />
                  ) : null}
                </>
              )}
            </th>
          ))}
        </tr>
      )}

      <tr className="title-row">
        {columns.map((column) => (
          <th
            key={createKey()}
            className="table-header-title"
            style={column.align ? { textAlign: column.align } : {}}
          >
            {disableSort || !column.isSort ? (
              column.header
            ) : (
              <span
                onClick={() => onSort(column.accessor)}
                className="button-inline"
              >
                {column.header}{" "}
                {sortDirectState !== -1 ? (!!sortDirectState ? "v" : "^") : ""}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
