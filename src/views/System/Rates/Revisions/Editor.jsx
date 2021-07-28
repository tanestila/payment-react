import * as Yup from "yup";
import { Formik, Form, FieldArray, Field } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../../Components/Common";
import { parseError } from "../../../../helpers/parseError";
import { ratesAPI } from "../../../../services/queries/management/rates";
import { Loading } from "../../../../Components/Common";

const columns = [
  {
    path: "transaction_type",
    label: "Transaction type",
    key: "transaction_type",
  },
  {
    path: "transaction_status",
    label: "Transaction status",
    key: "transaction_status",
  },
  { path: "card_schema", label: "Card schema", key: "card_schema" },
  { path: "card_region", label: "Card region", key: "card_region" },
  { path: "card_type", label: "Card type", key: "card_type" },
  { label: "Plain", path: "plain" },
  { path: "buy", label: "buy", key: "buy" },
  { path: "sell", label: "sell", key: "sell" },
];

export default function RevisionEditor({ handleClose, rate_guid, guid }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (body) => ratesAPI.updateRevisionFees(rate_guid, guid, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("rate-revision-fees");
      },
    }
  );

  const { data: fees, status } = useQuery(["all-revision-fees"], () =>
    ratesAPI.getRateRevisionFees(rate_guid, guid)
  );

  const Item = ({ col, index, fee }) => {
    switch (col) {
      case "buy":
        return <Field name={`fees.${index}.buy`} />;
      case "sell":
        return <Field name={`fees.${index}.sell`} />;
      case "plain":
        return fee[col] ? "fixed" : "%";

      default:
        return fee[col];
    }
  };

  if (status === "loading") return <Loading />;
  return (
    <Formik
      initialValues={{
        fees: fees.data,
      }}
      // validationSchema={Yup.object({

      // })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = values.fees.map((fee) => ({
            guid: fee.guid,
            buy: fee.buy,
            sell: fee.sell,
          }));
          await mutation.mutateAsync(data);
          SuccessModal("Fee was updated");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          {console.log(fees)}
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} style={{ padding: "5px 8px" }}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="fees"
                render={(arrayHelpers) => (
                  <>
                    {values.fees.map((fee, index) => (
                      <tr key={fee.guid}>
                        {columns.map((column) => (
                          <td
                            key={column.key + fee.guid}
                            style={{ padding: "5px 8px" }}
                          >
                            <Item col={column.path} index={index} fee={fee} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              />
            </tbody>
          </table>
          {isSubmitting ? (
            <FormLoading />
          ) : (
            <Button htmlType="submit" type="primary" className="f-right">
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}
