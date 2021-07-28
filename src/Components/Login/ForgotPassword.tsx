import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import background from "../../assets/img/background.png";
import logo from "../../assets/img/login-logo.svg";
import { ErrorModal, FormLoading, SuccessModal } from "../../Components/Common";
import { Field } from "../../Components/Common/Formik/Field";
import { parseError } from "../../helpers/parseError";
import { partnersAPI } from "../../services/queries/management/users/partners";

const options = [
  {
    guid: 0,
    name: "email",
    label: "email",
    value: 0,
  },
  {
    guid: 1,
    name: "phone",
    label: "phone",
    value: 1,
  },
  {
    guid: 2,
    name: "username",
    label: "username",
    value: 2,
  },
];
export const ForgotPassword = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(partnersAPI.addPartner, {
    onSuccess: () => {
      queryClient.invalidateQueries("partners");
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div
          className="login-image"
          style={{ backgroundImage: `url(${background})` }}
        >
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="form">
          <form autoComplete="off">
            <p className="header-login">Forgot password</p>
            <p className="tooltip-text">
              Enter your user account's verified email, phone or username and we
              will send you a password reset link.
            </p>
            <Formik
              initialValues={{
                type: options[0],
                value: "",
              }}
              validationSchema={Yup.object({
                first_name: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  let data = {
                    [values.type.name]: values.value,
                  };
                  await mutation.mutateAsync(data);
                  SuccessModal("Partner was created");
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
                    name="type"
                    inputType="select"
                    options={options}
                    label=""
                  />
                  <Field
                    name="value"
                    type="text"
                    label={`Enter ${values.type.name}`}
                  />

                  {isSubmitting ? (
                    <FormLoading />
                  ) : (
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="f-right"
                    >
                      Submit
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </form>
        </div>
      </div>
    </div>
  );
};
