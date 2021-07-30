import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { parseError } from "../../../helpers/parseError";
import valid from "card-validator";
import { blackListRulesAPI } from "../../../services/queries/management/blacklist/rules";

const types = [
  { name: "ip", guid: "ip", label: "ip", value: "ip" },
  { name: "card", guid: "card", label: "card", value: "card" },
  { name: "country", guid: "country", label: "Country", value: "country" },
  { name: "mask", guid: "mask", label: "Credit card mask", value: "mask" },
  { name: "bin", guid: "bin", label: "Credit card BIN", value: "bin" },
  { name: "email", guid: "email", label: "email", value: "email" },
];

export default function Creator({ handleClose }: { handleClose: () => {} }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(blackListRulesAPI.addRule, {
    onSuccess: () => {
      queryClient.invalidateQueries("blacklist-rules");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        type: types[0],
        description: "",
        values: [],
        text_values: "",
        separator: ",",
        advanced_form: false,
      }}
      validationSchema={() => {
        return Yup.lazy((values) => {
          let ruleValues = Yup.string();
          switch (values.type.name) {
            case "card":
              ruleValues = Yup.string().test(
                "test-number",
                "Credit Card number is invalid",
                (value) => valid.number(value).isValid
              );
              break;
            case "ip":
              ruleValues = Yup.string()
                .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
                  message: "Invalid IP address",
                  excludeEmptyString: true,
                })
                .test("ip", "Invalid IP address", (value) => {
                  return value === undefined || value.trim() === ""
                    ? true
                    : value.split(".").find((i) => parseInt(i, 10) > 255) ===
                        undefined;
                });
              break;
            case "country":
              ruleValues = Yup.string().matches(
                /^[A-Z]{2}$/,
                "Country must be Alpha-2 code"
              );
              break;
            case "mask":
              ruleValues = Yup.string().matches(
                /\d{6}\*{4,}\d{4}/,
                "Card mask is invalid"
              );
              break;
            case "bin":
              ruleValues = Yup.string().matches(
                /^[0-9]{6}$/,
                "Card BIN is invalid"
              );
              break;
            case "email":
              ruleValues = Yup.string().email("Email is invalid");
              break;
          }
          return Yup.object().shape({
            name: Yup.string().required("Required"),
            type: Yup.object().required("Required"),
            description: Yup.string().required("Required"),
            values: Yup.array()
              .of(ruleValues.required("Required"))
              .required("Required"),
            valueInputType: Yup.bool(),
            text_values: Yup.string(),
            separator: Yup.string(),
          });
        });
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let valuesArray = [];
          if (values.advanced_form) {
            if (values.separator === ",")
              valuesArray = values.text_values.split(",");
            else valuesArray = values.text_values.split(/\n/);
          } else {
            valuesArray = values.values;
          }
          const data = {
            name: values.name,
            type: values.type.name,
            description: values.description,
            values: valuesArray,
          };
          console.log(values);
          await mutation.mutateAsync(data);
          SuccessModal("Rule was created");
          handleClose();
          setSubmitting(false);
        } catch (error) {
          ErrorModal(parseError(error));
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Field
            name="advanced_form"
            label="Advanced form"
            inputType="checkbox-inverse"
          />

          <Field name="name" label="Name" />
          <Field name="type" label="Type" inputType="select" options={types} />
          <Field name="description" label="Description" />

          {values.advanced_form ? (
            <>
              <Field
                inputType="radio"
                name="separator"
                value=","
                valueLabel="Comma"
                label="Separator"
                options={[
                  { value: ",", label: "Comma" },
                  { value: ".", label: "Dot" },
                ]}
              />

              <Field name="text_values" label="Values" />
            </>
          ) : (
            <Field name="values" label="Values" inputType="array" />
          )}

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
