import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { blackListRulesAPI } from "../../../services/queries/management/blacklist/rules";
import { GlobalBlackListAPI } from "../../../services/queries/management/blacklist/global";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(GlobalBlackListAPI.addGlobalBlacklist, {
    onSuccess: () => {
      queryClient.invalidateQueries("global-blacklist");
    },
  });

  const {
    data: rules,
    isLoading: isMerchantLoading,
    isFetching: isMerchantFetching,
  } = useQuery(["rules"], () => blackListRulesAPI.getRules());

  const types = [
    { name: "allow", guid: "allow", label: "allow", value: "allow" },
    { name: "deny", guid: "deny", label: "deny", value: "deny" },
  ];

  return (
    <Formik
      initialValues={{
        blacklist_rule: null,
        type: types[0],
      }}
      validationSchema={Yup.object({
        blacklist_rule: Yup.object().typeError("Required").required("Required"),
        type: Yup.object().typeError("Required").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            blacklist_rule_guid: values.blacklist_rule!["guid"],
            type: values.type!["name"],
          };
          await mutation.mutateAsync(data);
          SuccessModal("Record was created");
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
          <Field
            name="blacklist_rule"
            label="Rule*"
            inputType="select"
            options={rules?.data}
            isLoading={isMerchantLoading || isMerchantFetching}
          />
          <Field name="type" label="Type*" inputType="select" options={types} />

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
