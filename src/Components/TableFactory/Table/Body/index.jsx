import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export default function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.accessor);
  };

  const createKey = () => {
    return uuidv4();
  };

  return (
    <>
      <tbody>
        {data.map((item) => {
          if (item.collapsed && item.collapsed.length) {
            return item.collapsed.map((collapsedItem, index) => {
              return (
                <tr
                  key={createKey()}
                  style={
                    item.colored === true
                      ? { backgroundColor: "AliceBlue" }
                      : {}
                  }
                >
                  {columns.map((column) => {
                    if (
                      Object.prototype.hasOwnProperty.call(item, column.path) &&
                      index === 0
                    ) {
                      return (
                        <td
                          key={createKey()}
                          style={column.style ? column.style : null}
                          rowSpan={item.collapsed.length}
                        >
                          {renderCell(item, column)}
                        </td>
                      );
                    } else if (
                      Object.prototype.hasOwnProperty.call(
                        collapsedItem,
                        column.path
                      )
                    ) {
                      return (
                        <td
                          key={createKey()}
                          style={column.style ? column.style : null}
                        >
                          {renderCell(collapsedItem, column)}
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              );
            });
          } else {
            return (
              <tr
                key={createKey()}
                style={
                  item.colored === true ? { backgroundColor: "AliceBlue" } : {}
                }
              >
                {columns.map((column) => (
                  <td
                    key={createKey()}
                    style={
                      column.align
                        ? { textAlign: column.align, ...column.style }
                        : column.style
                    }
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            );
          }
        })}
      </tbody>
    </>
  );
}
