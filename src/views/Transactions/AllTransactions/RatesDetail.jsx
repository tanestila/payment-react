import { auditAPI } from "../../../services/queries/audit";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import { useLoginsAuditColumns } from "../../../constants/columns";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useQuery } from "react-query";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import { Loading } from "../../../Components/Common";
import { Descriptions } from "antd";
import { formatDate } from "../../../helpers/formatDate";

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
            <Descriptions
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              bordered
              size="small"
            >
              <Descriptions.Item label="Base amount">
                {rates.base_amount}
              </Descriptions.Item>
              <Descriptions.Item label="To processor (%)">
                {rates.to_processor_pct}
              </Descriptions.Item>
              <Descriptions.Item label="To processor (fixed)">
                {rates.to_processor_fixed}
              </Descriptions.Item>
              <Descriptions.Item label="To bank (%)">
                {rates.to_bank_pct}
              </Descriptions.Item>
              <Descriptions.Item label="To bank (fixed)">
                {rates.to_bank_fixed}
              </Descriptions.Item>
              <Descriptions.Item label="To client">
                {rates.to_client}
              </Descriptions.Item>
              <Descriptions.Item label="Hold flag">
                <i
                  className={
                    rates.hold_flag ? "icon-success green" : "icon-failed red"
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Hold">
                {formatDate(rates.hold)}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {formatDate(rates.created_at)}
              </Descriptions.Item>
              <Descriptions.Item label="Created by">
                {rates.created_by_username}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {formatDate(rates.updated_at) || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Updated by">
                {rates.updated_by_username || "-"}
              </Descriptions.Item>
            </Descriptions>
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
