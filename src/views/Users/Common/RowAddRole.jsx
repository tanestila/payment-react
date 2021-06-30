import { Button } from "antd";
import { Field, Form, Formik } from "formik";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import * as Yup from "yup";

export const RowAddUser = ({ type, guid }) => {
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

  const {
    data: merchants,
    status: merchantsStatus,
    isLoading: merchantsIsLoading,
    error: merchantsError,
  } = useQuery(["merchants"], merchantsAPI.getMerchants(), {
    enabled: type === "group",
  });

  const {
    data: groups,
    status: groupsStatus,
    isLoading: groupsIsLoading,
    error: groupsError,
  } = useQuery(["groups"], groupsAPI.getGroups(), {
    enabled: type === "partner",
  });

  const modifiedMerchantsData = useMemo(() => {
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
      {groupsIsLoading || merchantsIsLoading ? (
        <Loading />
      ) : (
        <>
          <Formik
            initialValues={{
              user: null,
              reason: "",
            }}
            validationSchema={Yup.object({
              user: Yup.object().required("Required"),
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
                ErrorModal("Error");
                console.log(error);
              }
              setSubmitting(false);
            }}
          >
            {({ error, isSubmitting }) => (
              <Form className="modal-form">
                {error && error}

                <Field
                  name="user"
                  type="select"
                  options={
                    type === "group"
                      ? modifiedMerchantsData
                      : modifiedGroupsData
                  }
                  label={type === "group" ? "Merchant" : "Group"}
                />
                <Field name="reason" type="text" label="Reason*" />

                {isSubmitting ? (
                  <Loading />
                ) : (
                  <Button type="primary" style={{ float: "right" }}>
                    Submit
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};
