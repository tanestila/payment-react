import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Table from "../../Components/TableFactory";
import { merchantAPI } from "../../services/queries/management/merchant";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import { useDispatch, useSelector } from "react-redux";
import { setNewTable, setPageTable } from "../../redux/modules/table";

export default function Merchants() {
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.table.page);
  const items = useSelector((state) => state.table.items);
  // const { status, data, error, isFetching } = useMerchants();
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    // isPreviousData,
  } = useQuery(
    ["merchants", page, items],
    () => merchantAPI.getMerchants({ page, items }),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    dispatch(setNewTable());
  }, []);

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    dispatch(setPageTable(pageIndex));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Merchant name",
        accessor: "merchant_name",
        content: (cellInfo) => (
          <Link
            className="link"
            to={`/about/merchant/${cellInfo.merchant_guid}`}
          >
            {cellInfo.merchant_name}
          </Link>
        ),
      },
      {
        header: "Merchant type",
        accessor: "merchant_type",
      },
      {
        header: "Group",
        accessor: "group_name",
      },
      {
        header: "Partner",
        accessor: "partner_name",
      },
      {
        header: "Gateways",
        accessor: "gateways",
        content: (cellInfo) => cellInfo.gateways.join(", "),
      },
      {
        header: "Username",
        accessor: "username",
      },
      {
        header: "Email",
        accessor: "email",
      },
      {
        header: "Status",
        accessor: "enabled",
        content: (cellInfo) => (
          <i
            className={
              cellInfo.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },
      ability.can("EXECUTE", "USERMERCHANT") && {
        header: "Edit",
        accessor: "edit",
        content: () => <p>Edit</p>,
      },
      ability.can("DELETE", "USERMERCHANT") && {
        header: "Delete",
        accessor: "delete",
        content: () => <p>delete</p>,
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
            <Table
              columns={columns}
              data={data.data}
              fetchData={fetchData}
              count={parseInt(data.count, 10)}
            />
            <div>{isFetching ? "Updating..." : " "}</div>
          </div>
        </>
      )}
    </div>
  );
}
