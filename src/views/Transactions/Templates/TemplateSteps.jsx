import Table from "../../../Components/TableFactory/Table";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import useTemplateStepsColumns from "../../../constants/columns/transactions/templateSteps";
import { templatesAPI } from "../../../services/queries/management/transactions/templates";

export const TemplateSteps = ({ template_guid, gateway_guid }) => {
  const { isFetching, isLoading, isError, error, data, handleTableChange } =
    useTableQuery(
      "template-steps",
      () => templatesAPI.getTemplateSteps(template_guid, { gateway_guid }),
      false,
      10,
      [template_guid, gateway_guid]
    );

  const stepsColumns = useTemplateStepsColumns();

  return (
    <Table
      columns={stepsColumns}
      handleTableChange={handleTableChange}
      isFetching={isFetching}
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isPaginated={false}
    />
  );
};
