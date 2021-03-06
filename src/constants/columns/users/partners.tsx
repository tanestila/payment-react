import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { PartnerType } from "../../../types/partners";
import { DeleteModal } from "../../../Components/Common/DeleteModal";
import Editor from "../../../views/Users/Partners/Editor";
import { UseMutationResult } from "react-query";

export default function usePartnersColumns(
  ability: AppAbility,
  handleDelete: UseMutationResult<any, unknown, any, unknown>
) {
  return useMemo(
    () => [
      {
        title: "Partner name",
        dataIndex: "partner_name",
        key: "partner_name",
        sorter: true,
        search: "text",
        render: (text: string, record: PartnerType) => (
          <Link className="link" to={`/about/partner/${record.partner_guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Partner type",
        dataIndex: "partner_type",
        key: "partner_type",
        sorter: true,
        search: "text",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "group_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
        search: "text",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
        align: "center",
        render: (text: string, record: PartnerType) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },
      ability.can("EXECUTE", "USERPARTNER") && {
        key: "edit",
        align: "center",
        render: (text: string, record: PartnerType) => (
          <CustomModal
            header="Edit partner"
            content={Editor}
            contentProps={{ guid: record.partner_guid }}
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
      ability.can("DELETE", "USERPARTNER") && {
        key: "delete",
        align: "center",
        render: (text: string, record: PartnerType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() =>
              DeleteModal(handleDelete, { guid: record.partner_guid })
            }
          />
        ),
      },
    ],
    [ability]
  );
}
