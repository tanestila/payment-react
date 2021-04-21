import TableBody from "./Body";
import TableEmptyBody from "./EmptyBody";
import TableHeader from "./Header";

export default function Table({
  columns,
  data,
  tableWidth,
  columnsComponent,
  onSort,
}) {
  if ((data && !data.length) || !data)
    return (
      <>
        <table
          className="table"
          style={tableWidth ? { width: tableWidth + "%" } : undefined}
        >
          <TableHeader columns={columns} />
        </table>
        <TableEmptyBody />
      </>
    );
  return (
    <table
      className="table"
      style={tableWidth ? { width: tableWidth + "%" } : undefined}
    >
      {columnsComponent ? <colgroup>{columnsComponent}</colgroup> : null}
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}
