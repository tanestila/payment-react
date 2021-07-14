import { SummaryTable } from "./SummaryTable";
import { RatesTable } from "./RatesTable";

const StatementTables = ({ statement }) => {
  return (
    <>
      <SummaryTable
        currencies={statement.currencies}
        statement_currency_code={statement.statement_currency_code}
      />
      ssdsds
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
