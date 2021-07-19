import { Card } from "antd";
import MergeStatementForm from "./common/payable/Creator";
import { statementsAPI } from "../../../services/queries/management/statements";
import { useMutation, useQueryClient } from "react-query";
import StatementTables from "./common/payable/StatementTables";
import { useState } from "react";
import { Loading } from "../../../Components/Common";
import { useHistory } from "react-router-dom";

const Merge = () => {
  const [statement, setStatement] = useState(null);

  const queryClient = useQueryClient();
  let history = useHistory();

  const mutation = useMutation(statementsAPI.createStatement, {
    onSuccess: () => {
      queryClient.invalidateQueries("shop-terminals");
    },
  });

  const onSubmit = async (data, isSave) => {
    const statement = await mutation.mutateAsync(data);
    if (isSave) {
      history.push("/transactions/statements");
    } else {
      let keys = Object.keys(statement.entityData)
        .map((key) => (key.length === 3 || key === "Summary" ? key : null))
        .filter((key) => key !== null)
        .map((key) => ({ name: key }));
      statement.currencies = keys;
      setStatement(statement);
    }
  };

  return (
    <div>
      <Card title="Interim statement">
        <MergeStatementForm onSubmit={onSubmit} />
      </Card>
      <br />
      <Card>
        {mutation.isLoading ? (
          <Loading />
        ) : (
          statement && <StatementTables statement={statement} />
        )}
      </Card>
    </div>
  );
};
export default Merge;
