import { useMemo } from "react";
import { AppAbility } from "../../../Components/Common/Can";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { ShopType } from "../../../types/shops";
import Editor from "../../../views/System/RatesTemplates/Editor";
import { DeleteModal } from "../../../Components/Common/DeleteModal";

export default function useRatesTemplatesColumns(
  ability: AppAbility,
  handleDelete
) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        search: "text",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/rate-template/${record.guid}`}>
            {text}
          </Link>
        ),
      },

      ability.can("EXECUTE", "RATES") && {
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
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("DELETE", "USERMERCHANT") && {
        title: "",
        key: "delete",
        align: "center",
        render: (text: string, record: ShopType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(handleDelete, { guid: record.guid })}
          />
        ),
      },
    ],
    [ability]
  );
}
