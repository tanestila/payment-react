import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import { Loading, SuccessModal, ErrorModal } from "../../Components/Common";
import { parseError } from "../../helpers/parseError";
import { gatewaysAPI } from "../../services/queries/management/gateways";
import { ratesAPI } from "../../services/queries/management/rates";
import { terminalsAPI } from "../../services/queries/management/terminals";

export default function Params({ terminal_guid, gateway_guid, handleClose }) {
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery(
    ["terminal-properties", terminal_guid, gateway_guid],
    () => terminalsAPI.getTerminalProps({ terminal_guid, gateway_guid })
  );

  const mutation = useMutation(terminalsAPI.editTerminalProps, {
    onSuccess: () => {
      queryClient.invalidateQueries("terminal-properties");
    },
  });

  const initialValues = useMemo(() => {
    return properties
      ? properties.data.reduce(
          (obj, item) => ({ ...obj, [item.name]: item.value }),
          {}
        )
      : {};
  }, [properties]);

  if (isLoading) return <Loading />;
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={Yup.object({ schema })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let results = await Promise.allSettled(
            properties.data.map((item) => {
              return mutation.mutateAsync({
                terminal_guid,
                gateway_guid,
                name: item.name,
                value: values[item.name],
              });
            })
          );
          results.forEach((res) => {
            if (res.status === "rejected") throw res.reason;
          });

          SuccessModal("Terminal props was updated");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="modal-form">
          {console.log(values)}
          {properties.data.map((item) => {
            return (
              <Field
                name={item.name}
                inputType={item.bytea_flag ? "file" : "input"}
                label={item.label}
                accept={item.bytea_flag ? ".p12" : undefined}
              />
            );
          })}
          {isSubmitting ? (
            <Loading />
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
