import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function useTransactionTemplatesColumns() {
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        sorter: true,
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        align: "center",
      },
    ],
    []
  );
}
