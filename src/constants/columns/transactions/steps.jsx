import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { Params } from "../../../views/Transactions/Templates/Params";
import { Params as ProcessingParams } from "../../../views/Transactions/AllTransactions/Params";
import { Button } from "antd";
import moment from "moment";

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
              <Button type="button" className="btn-table">
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

export function useTransactionProcessingStepsColumns() {
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
        title: "name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        render: (text) =>
          moment(text).utcOffset(0).format("DD.MM.YYYY HH:mm:ss.SSS"),
      },
      {
        title: "Updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (text) =>
          moment(text).utcOffset(0).format("DD.MM.YYYY HH:mm:ss.SSS"),
      },
      {
        title: "Duration",
        key: "duration",
        render: (cellInfo) =>
          cellInfo.updated_at
            ? moment(moment(cellInfo.updated_at) - moment(cellInfo.created_at))
                .utcOffset(0)
                .format("mm:ss.SSS")
            : null,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Parameters",
        key: "Parameters",
        align: "center",
        render: (step) => {
          if (step.params.length)
            return (
              <CustomModal
                header={"Params " + step.name}
                content={ProcessingParams}
                contentProps={{ params: step.params }}
                button={
                  <Button type="button" className="btn-table">
                    Show
                  </Button>
                }
                // dialogClassName="modal-creator"
              />
            );
          else return null;
        },
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
