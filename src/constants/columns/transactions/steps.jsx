import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { Params } from "../../../views/Transactions/Templates/Params";
import { Button } from "antd";

export default function useTransactionStepsColumns() {
  return useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "guid",
        key: "guid",
        search: "text",
        render: (text: any, record: any) => (
          <>
            <Copy text={text} />
            <Link className="link" to={`/about/processing/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "number",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Parameters",
        key: "Parameters",
        align: "center",
        render: (step) => (
          <CustomModal
            header={"Params " + step.name}
            content={Params}
            contentProps={{ guid: step.guid }}
            button={
              <Button type="button" className="btn">
                Show
              </Button>
            }
            // dialogClassName="modal-creator"
          />
        ),
        // render: (text: any, record: any) => (
        //   <button type="button" className="btn btn-table">
        //     Show
        //   </button>
        // ),
      },
    ],
    []
  );
}
