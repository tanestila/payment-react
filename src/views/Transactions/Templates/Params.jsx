import { useQuery } from "react-query";
import { Loading } from "../../../Components/Common";
import { templatesAPI } from "../../../services/queries/management/transactions/templates";

export const Params = ({ guid }) => {
  const { data, isLoading } = useQuery(["step", guid], () =>
    templatesAPI.getStepParams(guid)
  );
  if (isLoading) return <Loading />;
  return (
    <>
      {data.map((param, index) => (
        <>
          {param.name}
          <div className="param-container">
            <span style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(param.value, null, "\t")}
            </span>
          </div>
        </>
      ))}
    </>
  );
};
