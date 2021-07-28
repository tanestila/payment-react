import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { rolesAPI } from "../../../services/queries/management/roles";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { parseError } from "../../../helpers/parseError";
import valid from "card-validator";

const types = [
  { name: "ip", guid: "ip", label: "ip", value: "ip" },
  { name: "card", guid: "card", label: "card", value: "card" },
  { name: "country", guid: "country", label: "Country", value: "country" },
  { name: "mask", guid: "mask", label: "Credit card mask", value: "mask" },
  { name: "bin", guid: "bin", label: "Credit card BIN", value: "bin" },
  { name: "email", guid: "email", label: "email", value: "email" },
];

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(adminsAPI.addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        type: types[0],
        description: "",
        values: [],
        textValues: "",
        valueInputType: false,
        separator: ",",
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
              // .test(
              //   "values",
              //   "Must contain at least one element",
              //   (value, context) => value.length !== 0
              // )
              .required("Required"),
            valueInputType: Yup.bool(),
            textValues: Yup.string(),
            separator: Yup.string(),
          });
        });
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const data = {
            name: values.name,
            type: values.type.name,
            description: values.description,
          };
          let valuesArray = [];
          if (values.valueInputType) {
            if (values.separator === ",")
              valuesArray = values.textValues.split(",");
            else valuesArray = values.textValues.split(/\n/);
          } else {
            valuesArray = values.values;
          }
          console.log(valuesArray);
          await dispatch(
            addBlackListItemAction(
              { ...data, values: valuesArray },
              currentPage,
              pageSize
            )
          );
          swal({
            title: "Record is created",
            icon: "success",
            button: false,
            timer: 2000,
          });
          setSubmitting(false);
        } catch (error) {
          const parsedError = parseResponse(error);
          Alert({ type: "error", message: parsedError.message });
        }
      }}
    >
      {({ isSubmitting, values, errors, touched }) => (
        <Form>
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <BSForm.Label htmlFor="values">Advanced form </BSForm.Label>

            <Field
              type="radio"
              name="valueInputType"
              type="checkbox"
              style={{
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "5px",
              }}
            />
          </div>

          <FormField name="name" label="Name" />
          <Field
            name="type"
            component={FormSelect}
            options={types}
            label={"Type"}
          />
          <FormField name="description" label="Description" />
          {values.valueInputType ? (
            <>
              <Row>
                <Col md={3} sm={4} xs={4} className="form-label">
                  <BSForm.Label htmlFor="values">Separator</BSForm.Label>
                </Col>
                <Col md={8}>
                  <Field type="radio" name="separator" value="," /> Comma{" "}
                  <Field type="radio" name="separator" value="\n" /> Enter
                </Col>
              </Row>
              <FormField name="textValues" label="Values" as="textarea" />
            </>
          ) : (
            <Row>
              <Col md={3} sm={4} xs={4} className="form-label">
                <BSForm.Label htmlFor="values">Values</BSForm.Label>
              </Col>
              <Col md={8}>
                <BSForm.Group>
                  <FieldArray
                    name="values"
                    render={(arrayHelpers) => (
                      <div>
                        {values.values.map((friend, index) => (
                          <div>
                            <div
                              className="d-flex"
                              style={{ marginBottom: "5px" }}
                              key={index}
                            >
                              <Field
                                name={`values.${index}`}
                                className="form-control"
                              />
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                            </div>

                            {errors.values &&
                            errors.values[index] &&
                            touched.values &&
                            touched.values[index]
                              ? errors.values[index]
                              : null}
                          </div>
                        ))}
                        {errors.values &&
                        !Array.isArray(errors.values) &&
                        touched.values
                          ? errors.values
                          : null}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                </BSForm.Group>
              </Col>
            </Row>
          )}

          <Button
            className="btn btn-fill btn-success"
            type="submit"
            // onClick={this.doSubmit}
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
}
