import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function TableHeader({ columns, disableSort = false, onSort }) {
  const { sortDirectState } = useSelector((state) => state.table);
  const createKey = () => {
    return uuidv4();
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

      {/* {!disableSearch && (
          <tr className="search-row">
            {columns.map((column) => (
              <th
                key={column.path || column.key}
                className={isSearch ? "searchOpen" : "searchClosed"}
              >
          Search
              </th>
            ))}
          </tr>
        )} */}

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
