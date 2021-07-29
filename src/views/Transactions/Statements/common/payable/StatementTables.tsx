import { SummaryTable } from "./SummaryTable";
import { RatesTable } from "../component/RatesTable";
import { Divider } from "antd";
const StatementTables = ({ statement }) => {
  return (
    <>
      <h5>Summary</h5>
      <SummaryTable statement_data={statement.statementData} />
      <Divider />
      <h5>Rates</h5>
      <RatesTable
        additional_fees_names={statement.additional_fees_names}
        currencies={statement.currencies}
        statement_currency_code={statement.statement_currency_code}
        entityData={statement.entityData}
      />
    </>
  );
};
export default StatementTables;
