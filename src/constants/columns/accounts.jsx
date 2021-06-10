import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";

export default function useAccountsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "Shop name",
        dataIndex: "shop_name",
        key: "shop_name",
      },
      {
        title: "Number",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Holder name",
        dataIndex: "holder_name",
        key: "holder_name",
      },

      {
        title: "Holder country",
        dataIndex: "holder_country",
        key: "holder_country",
      },
      {
        title: "Bank name",
        dataIndex: "bank_name",
        key: "bank_name",
      },
      {
        title: "Bank address",
        dataIndex: "bank_address",
        key: "bank_address",
      },
      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "Edit",
        key: "edit",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Edit merchant"
            // content={Editor}
            contentProps={{ guid: cellInfo.merchant_guid }}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
            // dialogClassName="modal-creator"
          />
        ),
      },
      // ability.can("DELETE", "USERMERCHANT") && {
      //   title: "Delete",
      //   key: "delete",
      //   align: "center",
      //   render: () => <span>delete</span>,
      // },
    ],
    [ability]
  );
}
