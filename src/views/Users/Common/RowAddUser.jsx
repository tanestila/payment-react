import { Button, Row } from "antd";
import { Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import * as Yup from "yup";
import { Field } from "../../../Components/Common/Formik/Field";
import { parseError } from "../../../helpers/parseError";

export const RowAddUser = ({ type, guid }) => {
  const [isShow, setIsShow] = useState(false);
  const queryClient = useQueryClient();
  const addMerchantMutation = useMutation(merchantsAPI.addMerchant, {
    onSuccess: () => {
      queryClient.invalidateQueries("group-merchants");
    },
  });

  const addGroupMutation = useMutation(groupsAPI.addGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("partner-groups");
    },
  });

  const onClick = () => {
    setIsShow(!isShow);
  };

  const { data: merchants, isLoading: merchantsIsLoading } = useQuery(
    ["merchants"],
    () => merchantsAPI.getMerchants(),
    { enabled: type === "group" }
  );

  const {
    data: groups,
    status: groupsStatus,
    isLoading: groupsIsLoading,
    error: groupsError,
  } = useQuery(["groups"], () => groupsAPI.getGroups(), {
    enabled: type === "partner",
  });

  const modifiedMerchantsData = useMemo(() => {
    console.log(merchants);
    return merchants
      ? merchants.data
          .map((merchant) => ({
            ...merchant,
            name: merchant.group_name,
            guid: merchant.group_guid,
          }))
          .filter((merchant) => merchant.group_guid === null)
      : [];
  }, [merchants]);

  const modifiedGroupsData = useMemo(() => {
    return groups
      ? groups.data
          .map((group) => ({
            ...group,
            name: group.group_name,
            guid: group.group_guid,
          }))
          .filter((group) => group.partner_guid === null)
      : [];
  }, [groups]);

  return (
    <div>
      <Row justify="center">
        <Button onClick={onClick} className="m-b-15">
          Add {type === "group" ? "Merchant" : "Group"}
        </Button>
      </Row>
      {isShow ? (
        <div>
          <Formik
            initialValues={{
              user: null,
              reason: "",
            }}
            validationSchema={Yup.object({
              user: Yup.object().typeError("Required").required("Required"),
              reason: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                let data = {};
                switch (type) {
                  case "group":
                    data = {
                      merchant_guid: values.user.merchant_guid,
                      group_guid: guid,
                      reason: values.reason,
                    };
                    await addMerchantMutation.mutateAsync(data);
                    break;
                  case "partner":
                    data = {
                      group_guid: values.user.group_guid,
                      partner_guid: guid,
                      reason: values.reason,
                    };
                    await addGroupMutation.mutateAsync(data);
                    break;
                  default:
                    break;
                }
                SuccessModal(
                  `${type === "group" ? "Merchant" : "Group"} was updated`
                );
              } catch (error) {
                ErrorModal(parseError(error));
                console.log(error);
              }
              setSubmitting(false);
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="modal-form">
                <Field
                  name="user"
                  inputType="select"
                  options={
                    type === "group"
                      ? modifiedMerchantsData
                      : modifiedGroupsData
                  }
                  label={type === "group" ? "Merchant*" : "Group*"}
                />
                <Field name="reason" type="text" label="Reason*" />

                {isSubmitting ? (
                  <Loading />
                ) : (
                  <Row justify="center">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
    </div>
  );
};
