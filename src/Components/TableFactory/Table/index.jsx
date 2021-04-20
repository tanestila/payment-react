import PropTypes from "prop-types";
import React, { Component } from "react";
import TableBody from "./Body";
import TableEmptyBody from "./EmptyBody";
import TableHeader from "./Header";

export default function Table({ columns, data, tableWidth, columnsComponent }) {
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
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}
