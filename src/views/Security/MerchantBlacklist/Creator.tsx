import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { blackListRulesAPI } from "../../../services/queries/management/blacklist/rules";
import { useMemo } from "react";
import { MerchantBlackListAPI } from "../../../services/queries/management/blacklist/merchant";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(MerchantBlackListAPI.addMerchantBlacklist, {
    onSuccess: () => {
      queryClient.invalidateQueries("merchant-blacklist");
    },
  });

  const {
    data: rules,
    isLoading: isRulesLoading,
    isFetching: isRulesFetching,
  } = useQuery(["rules"], () => blackListRulesAPI.getRules());

  const {
    data: merchants,
    isLoading: isMerchantLoading,
    isFetching: isMerchantFetching,
  } = useQuery(["merchants"], () => merchantsAPI.getMerchants());

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer) => ({
          ...mer,
          name: mer.merchant_name,
          guid: mer.merchant_guid,
        }))
      : [];
  }, [merchants]);

  const types = [
    { name: "allow", guid: "allow", label: "allow", value: "allow" },
    { name: "deny", guid: "deny", label: "deny", value: "deny" },
  ];

  return (
    <Formik
      initialValues={{
        blacklist_rule: null,
        type: types[0],
        merchant: "",
      }}
      validationSchema={Yup.object({
        blacklist_rule: Yup.object().typeError("Required").required("Required"),
        type: Yup.object().typeError("Required").required("Required"),
        merchant: Yup.object().typeError("Required").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            blacklist_rule_guid: values.blacklist_rule!["guid"],
            type: values.type!["name"],
            merchant_guid: values.merchant!["merchant_guid"],
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
            isLoading={isRulesLoading || isRulesFetching}
          />
          <Field name="type" label="Rule*" inputType="select" options={types} />
          <Field
            name="merchant"
            label="Merchant*"
            inputType="select"
            options={modifiedMerchantsData}
            isLoading={isMerchantLoading || isMerchantFetching}
          />
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
