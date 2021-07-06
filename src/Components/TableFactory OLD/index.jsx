import { useCallback } from "react";
import Table from "./Table/index";
import ButtonFilter from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageTable,
  setPageSizeTable,
  setSortKey,
} from "../../redux/modules/table";
import Pagination from "./Pagination";
import Select from "../Common/Select/CustomSelect";

export default function TableFactory({ modalComponent, columns, data, count }) {
  // const dispatch = useDispatch();
  // const page = useSelector((state) => state.table.page);
  // const pageSize = useSelector((state) => state.table.items);

  // const setPage = useCallback(
  //   (pageIndex) => {
  //     dispatch(setPageTable(pageIndex));
  //   },
  //   [dispatch]
  // );

  // const setPageSize = useCallback(
  //   (option) => {
  //     dispatch(setPageSizeTable(option.name));
  //   },
  //   [dispatch]
  // );

  // const onSort = useCallback(
  //   (sortKey) => {
  //     dispatch(setSortKey(sortKey));
  //   },
  //   [dispatch]
  // );

  return (
    <>
      <div className="main-table">
        <div className="group-buttons">
          <div className="main-buttons">
            {modalComponent && modalComponent.props.allowed ? (
              <div> {modalComponent} </div>
            ) : null}
            <ButtonFilter />
          </div>

          <div className="secondary-buttons">
            {/* <Export
                  searchData={searchData}
                  exportFunction={exportFunction}
                  columns={initColumns}
                  name={name}
                /> */}
          </div>
        </div>

        <div style={{ overflowX: "auto", width: "100%", minHeight: "300px" }}>
          <Table
            columns={columns}
            // columnsComponent={columnsComponent}
            // tableWidth={tableWidth}
            // search={search}
            data={data}
            onSort={onSort}
            // keyPath={keyPath}
            // get={get}
            // searchData={searchData}
            // updateData={this.updateData}
            // updateCurrentPage={this.updateCurrentPage}
            // onSort={this.onSort}
            // handleSortReset={this.handleSortReset}
            // sortKey={this.state.sortKey}
            // isSortReverse={this.state.isSortReverse}
            // disableSearch={this.props.disableSearch}
          />
        </div>

        <div className="table-navigation">
          <Pagination
            pagesCount={Math.floor(
              count / pageSize + (1 && !!(count % pageSize))
            )}
            currentPage={page}
            onPageChange={setPage}
            pageSize={pageSize}
            count={count}
          />

          <div className="page-size-container">
            <label>Page size:</label>

            <Select
              multi={false}
              name="Select the page size"
              options={[
                { guid: "1", name: 10 },
                { guid: "2", name: 20 },
                { guid: "3", name: 50 },
                { guid: "4", name: 100 },
              ]}
              onChange={setPageSize}
              placeholder={pageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}