import { useMemo } from "react";
import { AppAbility } from "../../../Components/Common/Can";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { ShopType } from "../../../types/shops";
import Editor from "../../../views/Shops/Editor";

export default function useServicesColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        search: "text",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/rates/${record.guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Start time",
        dataIndex: "start_time",
        key: "start_time",
      },
      ability.can("AUDIT", "SERVICESETTINGS") && {
        title: "History",
        dataIndex: "history",
        key: "history",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/gateway/${record.gateway_guid}`}>
            history
          </Link>
        ),
      },
      ability.can("READ", "SERVICES") && {
        title: "Detail",
        dataIndex: "detail_service",
        key: "detail_service",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/gateway/${record.gateway_guid}`}>
            history
          </Link>
        ),
      },
      ability.can("EXECUTE", "SERVICES") && {
        title: "Edit",
        key: "edit",
        align: "center",
        render: (text: string, record: ShopType) => (
          <CustomModal
            header="Edit merchant"
            content={Editor}
            contentProps={{ guid: record.guid }}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
          />
        ),
      },
    ],
    [ability]
  );
}
