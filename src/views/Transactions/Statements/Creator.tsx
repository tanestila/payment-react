import { Card } from "antd";
import StatementForm from "./common/interim/Creator";
import { statementsAPI } from "../../../services/queries/management/statements";
import { useMutation, useQueryClient } from "react-query";
import StatementTables from "./common/interim/StatementTables";
import { useState } from "react";
import { Loading } from "../../../Components/Common";
import { useHistory } from "react-router-dom";

const Creator = () => {
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
      setStatement(statement);
    }
  };

  return (
    <div>
      <Card title="Interim statement">
        <StatementForm onSubmit={onSubmit} />
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
export default Creator;
