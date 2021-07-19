import { Card, Divider, Button, Descriptions } from "antd";
import StatementForm from "./common/interim/Creator";
import StatementTables from "./common/interim/StatementTables";
import { useQuery } from "react-query";
import { statementsAPI } from "../../../services/queries/management/statements";
import { useParams } from "react-router-dom";
import { Loading } from "../../../Components/Common";
import { useMemo, useState } from "react";
import { formatDate } from "../../../helpers/formatDate";
import InterimDetail from "./common/interim/Detail";
import PayableDetail from "./common/payable/Detail";

const Detail = () => {
  let history = useParams();

  const { data: initStatement, status } = useQuery(
    ["statement", history.id],
    () => statementsAPI.getStatement(history.id)
  );

  const modifiedStatement = useMemo(() => {
    if (initStatement) {
      let statement = { ...initStatement };
      if (statement.is_payable_statement_flag) {
        let keys = Object.keys(statement.entityData)
          .map((key) => (key.length === 3 || key === "Summary" ? key : null))
          .filter((key) => key !== null)
          .map((key) => ({ name: key }));
        statement.currencies = keys;
      }
      return statement;
    }
  }, [initStatement]);

  if (status === "loading") return <Loading />;
  return (
    <>
      {!modifiedStatement?.is_payable_statement_flag ? (
        <InterimDetail statement={modifiedStatement} />
      ) : (
        <PayableDetail statement={modifiedStatement} />
      )}
    </>
  );
};
export default Detail;
