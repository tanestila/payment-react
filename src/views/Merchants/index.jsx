import { useCallback, useMemo, useState } from "react";
import Table from "../../Components/Table";
import {
  merchantAPI,
  useMerchants,
} from "../../services/queries/management/merchant";
import { useQuery } from "react-query";

export default function Merchants() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  // const { status, data, error, isFetching } = useMerchants();
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["merchants", page, items],
    () => merchantAPI.getMerchants({ page, items }),
    {
      keepPreviousData: true,
    }
  );

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    setPage(pageIndex);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Merchant name",
        accessor: "merchant_name",
      },
      {
        Header: "Merchant type",
        accessor: "merchant_type",
      },
      {
        Header: "Group",
        accessor: "group_name",
      },
      {
        Header: "Partner",
        accessor: "partner_name",
      },
    ],
    []
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            {/* <Table
              columns={columns}
              data={data.data}
              fetchData={fetchData}
              loading={isLoading}
              pageCount={data.count}
            /> */}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}
