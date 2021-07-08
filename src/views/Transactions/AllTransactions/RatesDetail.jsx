import { auditAPI } from "../../../services/queries/audit";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import { useLoginsAuditColumns } from "../../../constants/columns";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useQuery } from "react-query";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import { Loading } from "../../../Components/Common";

export const RatesDetail = ({ guid }) => {
  const {
    data: rates,
    status,
    isFetching,
    error,
  } = useQuery(["transaction-rates", guid], () =>
    transactionsAPI.getTransactionRates(guid)
  );

  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          {Object.keys(rates).length !== 0 ? (
            <table className="detailInfo">
              <tbody>
                <tr>
                  <th>Base amount:</th>
                  <td>{rates.base_amount}</td>
                </tr>
                <tr>
                  <th>To processor (%):</th>
                  <td>{rates.to_processor_pct}</td>
                </tr>
                <tr>
                  <th>To processor (fixed):</th>
                  <td>{rates.to_processor_fixed}</td>
                </tr>
                <tr>
                  <th>To bank (%):</th>
                  <td>{rates.to_bank_pct}</td>
                </tr>
                <tr>
                  <th>To bank (fixed):</th>
                  <td>{rates.to_bank_fixed}</td>
                </tr>
                <tr>
                  <th>To client:</th>
                  <td>{rates.to_client}</td>
                </tr>
                <tr>
                  <th>Hold:</th>
                  <td>{rates.hold}</td>
                </tr>
                <tr>
                  <th>Hold flag:</th>
                  <td>
                    <i
                      className={
                        rates.hold_flag
                          ? "icon-success green"
                          : "icon-failed red"
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>Created at:</th>
                  <td>{rates.created_at}</td>
                </tr>
                <tr>
                  <th>Updated at:</th>
                  <td>{rates.updated_at}</td>
                </tr>
                <tr>
                  <th>Updated by:</th>
                  <td>{rates.updated_by_username}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div align="center">
              <b>Sorry, this transaction doesn`t have rates</b>
            </div>
          )}
        </>
      )}
    </div>
  );
};
