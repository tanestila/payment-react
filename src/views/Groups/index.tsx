import { useContext, useEffect, useMemo } from "react";
import Table from "../../Components/TableFactory";
import { merchantAPI } from "../../services/queries/management/merchant";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setNewTable } from "../../redux/modules/table";
import Modal from "../../Components/Common/Modal";
import { MerchantType } from "../../types/merchants";
import { IResponse } from "../../types/common";
import Editor from "./Editor";
import Creator from "./Creator";

export default function Groups() {
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const { page, items, sortKey, sortDirect, sortDirectState } = useSelector(
    (state: RootStateOrAny) => state.table
  );

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    // isPreviousData,
  } = useQuery<IResponse<MerchantType>, Error>(
    ["groups", page, items, sortKey, sortDirect],
    () =>
      merchantAPI.getMerchants({
        page,
        items,
        sort_col: sortKey,
        sort_dir: sortDirect,
      }),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    dispatch(setNewTable());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        header: "Group name",
        accessor: "group_name",
        content: (cellInfo: MerchantType) => (
          <Link className="link" to={`/about/merchant/${cellInfo.group_guid}`}>
            {cellInfo.group_name}
          </Link>
        ),
        isSort: true,
      },
      {
        header: "Group type",
        accessor: "group_type",
      },
      {
        header: "Partner",
        accessor: "partner_name",
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
        content: (cellInfo: MerchantType) => (
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
        content: () => (
          <Modal
            header="Edit merchant"
            content={Editor}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("DELETE", "USERMERCHANT") && {
        header: "Delete",
        accessor: "delete",
        content: () => <p>delete</p>,
      },
    ],
    [ability]
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <span>Error: {error && error.message}</span>
      ) : (
        <>
          <div>
            <Table
              columns={columns}
              data={data?.data}
              count={parseInt(data?.count!, 10)}
              modalComponent={
                <Modal
                  allowed={ability.can("EXECUTE", "USERMERCHANT")}
                  button={
                    <button type="button" className="btn btn-fill btn-primary">
                      Create merchant
                    </button>
                  }
                  content={Creator}
                  header="Create merchant"
                  dialogClassName="modal-creator"
                />
              }
            />
            <div>{isFetching ? "Updating..." : " "}</div>
          </div>
        </>
      )}
    </div>
  );
}
