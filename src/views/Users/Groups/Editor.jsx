import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import { Alert, Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { parseError } from "../../../helpers/parseError";

export default function Editor({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const {
    data: group,
    status,
    isFetching,
    error,
  } = useQuery(["group", guid], () => groupsAPI.getGroup(guid));

  const groupMutation = useMutation(groupsAPI.addGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  const { data: partners } = useQuery(["partners"], () =>
    partnersAPI.getPartners()
  );

  const modifiedPartnersData = useMemo(() => {
    return partners
      ? partners.data.map((partner) => ({
          ...partner,
          name: partner.partner_name,
          guid: partner.partner_guid,
          label: partner.partner_name,
          value: partner.partner_guid,
        }))
      : [];
  }, [partners]);

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            name: group.group_name,
            type: group.group_type,
            monthly_amount_limit: group.monthly_amount_limit,
            partner: modifiedPartnersData.filter(
              (partner) => group.partner_guid === partner.partner_guid
            )[0],
            reason: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
            monthly_amount_limit: Yup.number()
              .typeError("You must specify a number")
              .required("Required"),
            reason: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                group_guid: guid,
                group_name: values.name,
                group_type: values.type,
                monthly_amount_limit: (
                  +values.monthly_amount_limit * 100
                ).toString(),
                reason: values.reason,
                partner_guid: values.partner?.["partner_guid"],
              };
              await groupMutation.mutateAsync(data);
              SuccessModal("Group was updated");
              handleClose();
            } catch (error) {
              ErrorModal(parseError(error));
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="modal-form">
              {status === "error" && (
                <Alert
                  message="Error"
                  description={error.message}
                  type="error"
                  showIcon
                />
              )}
              <Row>
                <Col>
                  <Field name="name" type="text" label="Merchant name*" />
                  <Field name="type" type="text" label="Merchant type*" />
                  <Field
                    name="monthly_amount_limit"
                    type="number"
                    label="Monthly amount limit*"
                  />
                  <Field
                    name="partner"
                    inputType="select"
                    options={modifiedPartnersData}
                    label="Partner"
                  />
                  <Field name="reason" type="text" label="Reason*" />
                </Col>
              </Row>
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
      )}
    </>
  );
}
