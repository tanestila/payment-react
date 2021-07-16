import { Card } from "antd";
import MergeStatementForm from "./common/payable/MergeStatementForm";
import { statementsAPI } from "../../../services/queries/management/statements";
import { useMutation, useQueryClient } from "react-query";
import StatementTables from "./common/interim/StatementTables";
import { useState } from "react";
import { Loading } from "../../../Components/Common";

const Merge = () => {
  const [statement, setStatement] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(statementsAPI.createStatement, {
    onSuccess: () => {
      queryClient.invalidateQueries("shop-terminals");
    },
  });

  const onSubmit = async (data) => {
    const statement = await mutation.mutateAsync(data);
    console.log(statement);
    setStatement(statement);
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
